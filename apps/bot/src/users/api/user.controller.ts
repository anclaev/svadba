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

import { CreateUserDto } from './dtos/create-user.dto'

import { User } from '../domain/user'

import { Auth } from '#/auth/application/decorators/auth.decorator'

import { CreateUserCommand } from '../application/commands/create-user.command'

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
  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const result = await this.commandBus.execute(new CreateUserCommand(dto))

    if (!(result instanceof User)) {
      switch (result) {
        case 'USER_ALREADY_EXISTS': {
          throw new ConflictException('Пользователь уже создан.')
        }
        default: {
          throw new BadRequestException(result)
        }
      }
    }

    return result
  }
}
