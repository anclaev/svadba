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

import { RegisterGuestCommand, RegisterGuestInput } from '../../app'
import { Guest, GUEST_ERRORS, GuestError } from '../../domain'

import { RegisterGuestDto } from '../dtos'

@ApiTags('Гость')
@Controller('guests')
export class GuestController {
  constructor(private readonly commandBus: CommandBus) {}

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
