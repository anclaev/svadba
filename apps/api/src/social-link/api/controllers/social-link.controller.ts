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
import { IPaginationResult } from '@repo/shared'

import { TTL_MS } from '#/common/constants'
import { IdQueryParamsDto } from '#/common/query-params'

import { User } from '#/user/domain'

import { Auth, AuthenticatedUser } from '#/auth/api'

import {
  CreateSocialLinkCommand,
  DeleteSocialLinkCommand,
  SocialLinkByIdQuery,
  SocialLinksDto,
  SocialLinksQuery,
  UpdateSocialLinkCommand,
} from '#/social-link/app'
import {
  SOCIAL_LINK_ERRORS,
  SocialLink,
  SocialLinkError,
} from '#/social-link/domain'

import { CreateSocialLinkDto, UpdateSocialLinkDto } from '../dtos'

@ApiTags('Социальная ссылка')
@Controller('social-links')
export class SocialLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiOperation({ summary: 'Получение ссылки по ID' })
  @ApiQuery({ type: IdQueryParamsDto })
  @ApiNotFoundResponse({ description: 'Ссылка не найдена' })
  @ApiOkResponse({
    description: 'Ссылка успешно получена',
    type: SocialLink,
  })
  @CacheKey('social_link_by_id')
  @CacheTTL(TTL_MS.DAY)
  @Get(':id')
  async socialLinkById(@Param() { id }: IdQueryParamsDto): Promise<SocialLink> {
    const socialLink = await this.queryBus.execute(new SocialLinkByIdQuery(id))

    if (socialLink instanceof SocialLinkError) {
      switch (socialLink.message) {
        case SOCIAL_LINK_ERRORS.SOCIAL_LINK_NOT_FOUND: {
          throw new NotFoundException('Ссылка с данным ID не найдена.')
        }
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return socialLink
  }

  @ApiOperation({ summary: 'Получение списка ссылок' })
  @ApiQuery({ type: SocialLinksDto })
  @ApiOkResponse({
    description: 'Список ссылок успешно получен',
  })
  @CacheKey('social_links')
  @CacheTTL(TTL_MS.DAY)
  @Get()
  async socialLinks(
    @Query() query: SocialLinksDto
  ): Promise<IPaginationResult<SocialLink>> {
    const res = await this.queryBus.execute(new SocialLinksQuery(query))

    if (res instanceof SocialLinkError) {
      switch (res.message) {
        default: {
          throw new InternalServerErrorException('Неизвестная ошибка.')
        }
      }
    }

    return res
  }

  @ApiOperation({ summary: 'Создание ссылки' })
  @ApiBody({
    description: 'Данные для создания ссылки',
    type: CreateSocialLinkDto,
  })
  @ApiCreatedResponse({
    description: 'Ссылка успешно создана',
    type: () => SocialLink,
  })
  @ApiConflictResponse({ description: 'Неуникальный алиас ссылки' })
  @ApiUnauthorizedResponse({ description: 'Ошибка авторизации' })
  @ApiBadRequestResponse({ description: 'Некорректный создатель ссылки' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Post()
  async createSocialLink(
    @Body() dto: CreateSocialLinkDto,
    @AuthenticatedUser() user: User
  ): Promise<SocialLink> {
    const res = await this.commandBus.execute(
      new CreateSocialLinkCommand({
        ...dto,
        creatorId: dto.creatorId || user.id,
      })
    )

    if (res instanceof SocialLinkError) {
      switch (res.message) {
        case SOCIAL_LINK_ERRORS.SOCIAL_LINK_ALREADY_EXISTS: {
          throw new ConflictException('Ссылка с данным алиасом уже создана.')
        }
        case SOCIAL_LINK_ERRORS.SOCIAL_LINK_BAD_CREATOR: {
          throw new BadRequestException('Некорректный владелец ссылки.')
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }

  @ApiOperation({ summary: 'Обновление ссылки по идентификатору' })
  @ApiBody({
    description: 'Данные для обновления ссылки',
    type: UpdateSocialLinkDto,
  })
  @ApiOkResponse({
    description: 'Ссылка успешно обновлена',
    type: SocialLink,
  })
  @ApiNotFoundResponse({ description: 'Ссылка не найдена' })
  @ApiUnauthorizedResponse({ description: 'Ошибка доступа' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Put(':id')
  async updateSocialLink(
    @Param() { id }: IdQueryParamsDto,
    @Body() dto: UpdateSocialLinkDto
  ): Promise<SocialLink> {
    if (!dto.href && !dto.icon && !dto.title) {
      throw new BadRequestException('Отсутствуют поля для изменения ссылки.')
    }

    const res = await this.commandBus.execute(
      new UpdateSocialLinkCommand(id, dto)
    )

    if (res instanceof SocialLinkError) {
      switch (res.message) {
        case SOCIAL_LINK_ERRORS.SOCIAL_LINK_NOT_FOUND: {
          throw new NotFoundException(`Ссылка не найдена.`)
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }

  @ApiOperation({
    summary: 'Удаление ссылки по идентификатору',
  })
  @ApiQuery({ type: () => IdQueryParamsDto })
  @ApiOkResponse({ description: 'Ссылка успешно удалена', type: Boolean })
  @ApiNotFoundResponse({ description: 'Ссылка не найдена' })
  @ApiCookieAuth()
  @Auth(['ADMIN'])
  @Delete(':id')
  async deleteSocialLink(@Param() { id }: IdQueryParamsDto): Promise<boolean> {
    const res = await this.commandBus.execute(
      new DeleteSocialLinkCommand({ id })
    )

    if (res instanceof SocialLinkError) {
      switch (res.message) {
        case SOCIAL_LINK_ERRORS.SOCIAL_LINK_NOT_FOUND: {
          throw new NotFoundException(`Ссылка не найдена.`)
        }
        default: {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }
      }
    }

    return res
  }
}
