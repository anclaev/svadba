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
  ApiBadRequestResponse,
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
import { IPaginationResult, isUndefined } from '@repo/shared'

import { TTL_MS } from '#/common/constants'
import { IdQueryParamsDto } from '#/common/query-params'

import { User } from '#/user/domain'

import {
  CreateRegistrationLinkCommand,
  DeleteRegistrationLinkCommand,
  RegistrationLinkByIdQuery,
  RegistrationLinksDto,
  RegistrationLinksQuery,
  UpdateRegistrationLinkCommand,
} from '../../app'

import {
  REGISTRATION_LINK_ERRORS,
  RegistrationLink,
  RegistrationLinkError,
} from '../../domain'

import { Auth, AuthenticatedUser } from '../decorators'

import { CreateRegistrationLinkDto, UpdateRegistrationLinkDto } from '../dtos'

@ApiTags('Регистрационная ссылка')
@Controller('registration-links')
export class RegistrationLinkController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @ApiOperation({
    summary: 'Получение регистрационной ссылки по идентификатору',
  })
  @ApiQuery({ type: IdQueryParamsDto })
  @ApiNotFoundResponse({ description: 'Регистрационная ссылка не найдена' })
  @ApiOkResponse({
    description: 'Регистрационная ссылка успешно получена',
    type: RegistrationLink,
  })
  @ApiCookieAuth()
  @CacheKey('registration_link_by_id')
  @CacheTTL(TTL_MS.DAY)
  @Get(':id')
  @Auth(['ADMIN'])
  async registrationLinkById(
    @Param() { id }: IdQueryParamsDto
  ): Promise<RegistrationLink> {
    const res = await this.queryBus.execute(new RegistrationLinkByIdQuery(id))

    if (res instanceof RegistrationLinkError) {
      switch (res.message) {
        case REGISTRATION_LINK_ERRORS.REGISTRATION_LINK_NOT_FOUND: {
          throw new NotFoundException('Ссылка не найдена.')
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }

  @ApiOperation({ summary: 'Получение регистрационных ссылок' })
  @ApiQuery({ type: RegistrationLinksDto })
  @ApiOkResponse({
    description: 'Список регистрационных ссылок успешно получен',
  })
  @ApiCookieAuth()
  @CacheKey('registration_links')
  @CacheTTL(TTL_MS.DAY)
  @Auth(['ADMIN'])
  @Get()
  async registrationLinks(
    @Query() query: RegistrationLinksDto
  ): Promise<IPaginationResult<RegistrationLink>> {
    const res = await this.queryBus.execute(new RegistrationLinksQuery(query))

    if (res instanceof RegistrationLinkError) {
      switch (res.message) {
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return res
  }

  @ApiOperation({ summary: 'Создание регистрационной ссылки' })
  @ApiBody({
    description: 'Данные для создания регистрационной ссылки',
    type: CreateRegistrationLinkDto,
  })
  @ApiCreatedResponse({
    description: 'Регистрационная ссылка успешно создана',
    type: () => RegistrationLink,
  })
  @ApiConflictResponse({ description: 'Неуникальный логин пользователя' })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Post()
  async createRegistrationLink(
    @AuthenticatedUser() user: User,
    @Body() dto: CreateRegistrationLinkDto
  ): Promise<RegistrationLink> {
    const result = await this.commandBus.execute(
      new CreateRegistrationLinkCommand({
        ownerId: user.id,
        ...dto,
      })
    )

    if (result instanceof RegistrationLinkError) {
      switch (result.message) {
        case REGISTRATION_LINK_ERRORS.REGISTRATION_LINK_META_LOGIN_EXISTS:
          throw new ConflictException('Данный логин занят.')
        default:
          throw new InternalServerErrorException(result.message)
      }
    }

    return result
  }

  @ApiOperation({
    summary: 'Обновление регистрационной ссылки по идентификатору',
  })
  @ApiBody({
    description: 'Данные для обновления регистрационной ссылки',
    type: UpdateRegistrationLinkDto,
  })
  @ApiOkResponse({
    description: 'Регистрационная ссылка успешно обновлена',
    type: RegistrationLink,
  })
  @ApiNotFoundResponse({ description: 'Регистрационная ссылка не найдена' })
  @ApiBadRequestResponse({ description: 'Логин уже занят' })
  @ApiUnauthorizedResponse({ description: 'Ошибка доступа' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Put(':id')
  async updateRegistrationLink(
    @Param() { id }: IdQueryParamsDto,
    @Body() dto: UpdateRegistrationLinkDto
  ): Promise<RegistrationLink> {
    if (
      isUndefined(dto.expiresAt) &&
      isUndefined(dto.isActive) &&
      isUndefined(dto.meta)
    ) {
      throw new BadRequestException('Отсутствуют поля для изменения ссылки.')
    }

    const res = await this.commandBus.execute(
      new UpdateRegistrationLinkCommand(id, dto)
    )

    if (res instanceof RegistrationLinkError) {
      switch (res.message) {
        case REGISTRATION_LINK_ERRORS.REGISTRATION_LINK_NOT_FOUND: {
          throw new NotFoundException('Ссылка не найдена.')
        }
        case REGISTRATION_LINK_ERRORS.REGISTRATION_LINK_META_LOGIN_EXISTS: {
          throw new BadRequestException('Логин уже занят.')
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }

  @ApiOperation({
    summary: 'Удаление регистрационной ссылки по идентификатору',
  })
  @ApiQuery({ type: () => IdQueryParamsDto })
  @ApiOkResponse({
    description: 'Регистрационная ссылка успешно удалена',
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'Регистрационная ссылка не найдена' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Delete(':id')
  async deleteRegistrationLink(
    @Param() { id }: IdQueryParamsDto
  ): Promise<boolean> {
    const res = await this.commandBus.execute(
      new DeleteRegistrationLinkCommand(id)
    )

    if (res instanceof RegistrationLinkError) {
      switch (res.message) {
        case REGISTRATION_LINK_ERRORS.REGISTRATION_LINK_NOT_FOUND: {
          throw new NotFoundException('Ссылка не найдена.')
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }
}
