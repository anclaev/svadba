import { CacheKey, CacheTTL } from '@nestjs/cache-manager'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { IPaginationResult } from '@repo/shared'

import { TTL_MS } from '#/common/constants'

import { Auth } from '#/auth/api'

import {
  GuestsDto,
  GuestsQuery,
  RegisterGuestCommand,
  RegisterGuestInput,
} from '../../app'
import { Guest, GUEST_ERRORS, GuestError } from '../../domain'

import { RegisterGuestDto } from '../dtos'

@ApiTags('Гость')
@Controller('guests')
export class GuestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiOperation({ summary: 'Получение списка гостей' })
  @ApiQuery({ type: GuestsDto })
  @ApiOkResponse({
    description: 'Список гостей успешно получен',
  })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @CacheKey('guests')
  @CacheTTL(TTL_MS.DAY)
  @Auth()
  @Get()
  async guests(@Query() query: GuestsDto): Promise<IPaginationResult<Guest>> {
    const res = await this.queryBus.execute(new GuestsQuery(query))

    if (res instanceof GuestError) {
      switch (res.message) {
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return res
  }

  @ApiOperation({ summary: 'Создание гостя' })
  @ApiBody({
    description: 'Данные для создания гостя',
    type: RegisterGuestDto,
  })
  @ApiCreatedResponse({
    description: 'Гость успешно создан',
    type: Guest,
  })
  @ApiConflictResponse({ description: 'Неуникальный логин гостя ' })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Post()
  async registerGuest(@Body() dto: RegisterGuestDto): Promise<Guest> {
    const res = await this.commandBus.execute(
      new RegisterGuestCommand(dto as unknown as RegisterGuestInput)
    )

    if (res instanceof GuestError) {
      switch (res.message) {
        case GUEST_ERRORS.GUEST_ALREADY_EXISTS: {
          throw new ConflictException(
            'Гость с данным логином уже зарегистрирован.'
          )
        }
        case GUEST_ERRORS.GUEST_UNKNOWN_ERROR: {
          throw new InternalServerErrorException(
            'Неизвестная ошибка регистрации гостя.'
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
