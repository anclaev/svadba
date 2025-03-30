import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
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

import { Auth } from '#/auth/application/decorators/auth.decorator'

import { CreateUserCommand, CreateUserDto } from '../app/commands'
import { User } from '../domain'
import { USER_ERRORS, UserError } from '../infra'

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
    const res = await this.commandBus.execute(new CreateUserCommand(dto))

    if (res instanceof UserError) {
      switch (res.message) {
        case USER_ERRORS.USER_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным логином уже создан.'
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
