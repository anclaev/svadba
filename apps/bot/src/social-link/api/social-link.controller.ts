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

import { Auth } from '#/auth/application/decorators/auth.decorator'
import { AuthenticatedUser } from '#/auth/application/decorators/user.decorator'

import { TTL_MS } from '#/common/constants'
import type { PaginateOutput } from '#/common/pagination'
import { IdQueryParamsDto } from '#/common/query-params/id.query-params'

import { SOCIAL_LINK_ERRORS, SocialLinkError } from '../infra'

import { User } from '#/user/domain'
import { SocialLink } from '../domain/SocialLink'

import {
  CreateSocialLinkCommand,
  CreateSocialLinkDto,
} from '../app/commands/create-social-link'
import { DeleteSocialLinkCommand } from '../app/commands/delete-social-link'

import {
  UpdateSocialLinkCommand,
  UpdateSocialLinkDto,
} from '../app/commands/update-social-link'

import { GetSocialLinkByIdQuery } from '../app/queries/get-social-link-by-id'
import {
  GetSocialLinksDto,
  GetSocialLinksQuery,
} from '../app/queries/get-social-links'

@ApiTags('Социальная ссылка')
@Controller('links')
export class SocialLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @ApiOperation({ summary: 'Получение ссылки по ID' })
  @ApiQuery({ type: IdQueryParamsDto })
  @ApiNotFoundResponse({ description: 'Ссылка не найдена' })
  @ApiOkResponse({ description: 'Ссылка успешно получена', type: SocialLink })
  @CacheKey('get_social_link_by_id')
  @CacheTTL(TTL_MS.DAY)
  @Get(':id')
  async getSocialLinkById(
    @Param() { id }: IdQueryParamsDto
  ): Promise<SocialLink> {
    const socialLink = await this.queryBus.execute(
      new GetSocialLinkByIdQuery(id)
    )

    if (!socialLink) {
      throw new NotFoundException(`Ссылка с данным ID не найдена.`)
    }

    return socialLink
  }

  @ApiOperation({ summary: 'Получение списка ссылок' })
  @ApiQuery({ type: GetSocialLinksDto })
  @ApiOkResponse({
    description: 'Список ссылок успешно получен',
  })
  @CacheKey('get_social_links')
  @CacheTTL(TTL_MS.DAY)
  @Get()
  async GetSocialLinks(
    @Query() query: GetSocialLinksDto
  ): Promise<PaginateOutput<SocialLink>> {
    return await this.queryBus.execute(new GetSocialLinksQuery(query))
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
        creatorId: dto.creatorId || user.id!,
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
  @ApiOkResponse({ description: 'Ссылка успешно обновлена', type: SocialLink })
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
    const res = await this.commandBus.execute(new DeleteSocialLinkCommand(id))

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
