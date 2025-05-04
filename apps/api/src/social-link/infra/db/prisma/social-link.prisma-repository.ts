import { Injectable } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { ISocialLinkPrismaModel } from '#/common/models'
import { paginate, paginateOutput } from '#/common/pagination'

import { PrismaService } from '#/core/prisma.service'

import {
  ISocialLinkQueryParams,
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { SocialLinkPrismaMapper } from '#/social-link/infra'

@Injectable()
export class SocialLinkPrismaRepository extends SocialLinkRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(entity: SocialLink): Promise<SocialLink | SocialLinkError> {
    const { creatorId, ...model } = SocialLinkPrismaMapper.toModel(entity)

    try {
      const createdSocialLink = await this.prisma.socialLink.create({
        data: {
          ...model,
          creatorId: undefined,
          creator: {
            connect: {
              id: creatorId,
            },
          },
        },
        include: { creator: true },
      })

      return SocialLinkPrismaMapper.toEntity(
        createdSocialLink as ISocialLinkPrismaModel
      )
    } catch {
      return new SocialLinkError('SOCIAL_LINK_UNKNOWN_ERROR')
    }
  }

  async update(entity: SocialLink): Promise<SocialLink | SocialLinkError> {
    const model = SocialLinkPrismaMapper.toModel(entity)

    try {
      const updatedSocialLink = await this.prisma.socialLink.update({
        where: {
          id: model.id,
        },
        data: {
          ...model,
          creatorId: undefined,
          creator: {
            connect: {
              id: model.creatorId,
            },
          },
        },
        include: { creator: true },
      })

      return SocialLinkPrismaMapper.toEntity(
        updatedSocialLink as ISocialLinkPrismaModel
      )
    } catch {
      return new SocialLinkError('SOCIAL_LINK_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | SocialLinkError> {
    try {
      return !!(await this.prisma.socialLink.delete({ where: { id } }))
    } catch {
      return new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
    }
  }

  async exists(alias: string): Promise<boolean | SocialLinkError> {
    try {
      return !!(await this.prisma.socialLink.findUnique({ where: { alias } }))
    } catch {
      return new SocialLinkError('SOCIAL_LINK_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<SocialLink | SocialLinkError> {
    try {
      const SocialLink = await this.prisma.socialLink.findUnique({
        where: { id },
        include: { creator: true },
      })

      return SocialLink
        ? SocialLinkPrismaMapper.toEntity(SocialLink as ISocialLinkPrismaModel)
        : new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
    } catch {
      return new SocialLinkError('SOCIAL_LINK_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: ISocialLinkQueryParams
  ): Promise<IPaginationResult<SocialLink> | SocialLinkError> {
    const where = {
      alias: queryParams.alias
        ? {
            contains: queryParams.alias,
          }
        : undefined,
      title: queryParams.title
        ? {
            contains: queryParams.title,
          }
        : undefined,
      href: queryParams.href
        ? {
            contains: queryParams.href,
          }
        : undefined,
      creator: queryParams.creatorLogin
        ? {
            login: {
              contains: queryParams.creatorLogin,
            },
          }
        : undefined,
    }

    try {
      const [socialLinks, total] = await Promise.all([
        await this.prisma.socialLink.findMany({
          ...paginate(paginationParams),
          where,
        }),
        await this.prisma.socialLink.count({ where }),
      ])

      return paginateOutput<SocialLink>(
        (socialLinks as ISocialLinkPrismaModel[]).map((socialLink) =>
          SocialLinkPrismaMapper.toEntity(socialLink)
        ),
        total,
        paginationParams
      )
    } catch (e) {
      console.log(e)

      return new SocialLinkError('SOCIAL_LINK_UNKNOWN_ERROR')
    }
  }
}
