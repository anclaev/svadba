import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { IdQueryParamsDto } from '#/common/query-params'

import { Auth } from '#/auth/api'

import {
  CreateUserCommand,
  CreateUserInput,
  DeleteUserCommand,
  UpdateUserCommand,
} from '#/user/app'

import { User, USER_ERRORS, UserError } from '#/user/domain'

import { CreateUserDto, UpdateUserDto } from '../dtos'

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
    type: User,
  })
  @ApiConflictResponse({ description: 'Неуникальные поля пользователя' })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
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

  @ApiOperation({ summary: 'Обновление пользователя по идентификатору' })
  @ApiBody({
    description: 'Данные для обновления пользователя',
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'Пользователь успешно обновлен',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiUnauthorizedResponse({ description: 'Ошибка доступа' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Put(':id')
  async updateUser(
    @Param() { id }: IdQueryParamsDto,
    @Body() dto: UpdateUserDto
  ): Promise<User> {
    if (
      !dto.guestId &&
      !dto.login &&
      !dto.name &&
      !dto.password &&
      !dto.role &&
      !dto.status &&
      !dto.telegramId
    ) {
      throw new BadRequestException(
        'Отсутствуют поля для изменения пользователя.'
      )
    }

    const res = await this.commandBus.execute(new UpdateUserCommand(id, dto))

    if (res instanceof UserError) {
      switch (res.message) {
        case USER_ERRORS.USER_NOT_FOUND: {
          throw new NotFoundException(`Пользователь не найден.`)
        }

        case USER_ERRORS.USER_GUEST_ID_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным ID гостя уже существует.'
          )
        }

        case USER_ERRORS.USER_LOGIN_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным логином уже существует.'
          )
        }

        case USER_ERRORS.USER_TELEGRAM_ID_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным telegramId уже существует.'
          )
        }

        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }

  @ApiOperation({
    summary: 'Удаление пользователя по идентификатору',
  })
  @ApiQuery({ type: () => IdQueryParamsDto })
  @ApiOkResponse({
    description: 'Пользователь успешно удалён',
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Delete(':id')
  async deleteUser(@Param() { id }: IdQueryParamsDto): Promise<boolean> {
    const res = await this.commandBus.execute(new DeleteUserCommand({ id }))

    if (res instanceof UserError) {
      switch (res.message) {
        case USER_ERRORS.USER_NOT_FOUND: {
          throw new NotFoundException(`Пользователь не найден.`)
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }
}
