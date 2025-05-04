import { CacheKey, CacheTTL } from '@nestjs/cache-manager'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { IPaginationResult } from '@repo/shared'

import { TTL_MS } from '#/common/constants'
import { IdQueryParamsDto } from '#/common/query-params'

import { Auth } from '#/auth/api'

import {
  CreateUserCommand,
  CreateUserInput,
  DeleteUserCommand,
  UpdateUserCommand,
  UserByIdQuery,
  UserByLoginQuery,
  UsersDto,
  UsersQuery,
} from '#/user/app'

import { User, USER_ERRORS, UserError } from '#/user/domain'

import { CreateUserDto, UpdateUserDto, UserByLoginDto } from '../dtos'

@ApiTags('Пользователь')
@ApiExcludeController()
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiQuery({ type: IdQueryParamsDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiOkResponse({
    description: 'Пользователь успешно получен',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @CacheKey('user_by_id')
  @CacheTTL(TTL_MS.DAY)
  @Auth()
  @Get(':id')
  async userById(@Param() { id }: IdQueryParamsDto): Promise<User> {
    const user = await this.queryBus.execute(new UserByIdQuery(id))

    if (user instanceof UserError) {
      switch (user.message) {
        case USER_ERRORS.USER_NOT_FOUND: {
          throw new NotFoundException('Пользователь с данным ID не найден.')
        }
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return user
  }

  @ApiOperation({ summary: 'Получение пользователя по логину' })
  @ApiQuery({ type: UserByLoginDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiOkResponse({
    description: 'Пользователь успешно получен',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @ApiExcludeEndpoint()
  @CacheKey('user_by_login')
  @CacheTTL(TTL_MS.DAY)
  @Auth()
  @Get('login/:login')
  async userByLogin(@Param() { login }: UserByLoginDto): Promise<User> {
    const user = await this.queryBus.execute(new UserByLoginQuery(login))

    if (user instanceof UserError) {
      switch (user.message) {
        case USER_ERRORS.USER_NOT_FOUND: {
          throw new NotFoundException(
            'Пользователь с данным логином не найден.'
          )
        }
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return user
  }

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiQuery({ type: UsersDto })
  @ApiOkResponse({
    description: 'Список пользователей успешно получен',
  })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @CacheKey('users')
  @CacheTTL(TTL_MS.DAY)
  @Auth()
  @Get()
  async users(@Query() query: UsersDto): Promise<IPaginationResult<User>> {
    const res = await this.queryBus.execute(new UsersQuery(query))

    if (res instanceof UserError) {
      switch (res.message) {
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return res
  }

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
