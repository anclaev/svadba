import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { Auth } from '#/auth/api'

import { CreateUserCommand, CreateUserInput } from '#/user/app'
import { User, USER_ERRORS, UserError } from '#/user/domain'
import { CreateUserDto } from '../dtos/create-user.dto'

@ApiTags('Пользователь')
@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiBody({
    description: 'Данные для создания пользователя',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'Пользователь успешно создан',
    type: () => User,
  })
  @ApiConflictResponse({ description: 'Неуникальные поля пользователя' })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    const res = await this.commandBus.execute(
      new CreateUserCommand(dto as unknown as CreateUserInput)
    )

    if (res instanceof UserError) {
      switch (res.message) {
        case USER_ERRORS.USER_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным логином уже создан.'
          )
        }
        case USER_ERRORS.USER_UNKNOWN_ERROR: {
          throw new InternalServerErrorException(
            'Неизвестная ошибка создания пользователя.'
          )
        }
        default: {
          throw new BadRequestException(res)
        }
      }
    }

    return res
  }
}
