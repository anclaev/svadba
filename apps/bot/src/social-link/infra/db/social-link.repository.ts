import { Injectable } from '@nestjs/common'

import { PrismaService } from '#/core/prisma.service'

import {
  paginate,
  paginateOutput,
  type PaginateOutput,
} from '#/common/pagination'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkError } from '../index'
import { SocialLinkModel } from '../interfaces'
import { SocialLinkMapper } from '../mappers'

import type { GetSocialLinksDto } from '#/social-link/app/queries/get-social-links'

interface ISocialLinkRepository {
  exists(alias: string): Promise<boolean>
  create(socialLink: SocialLink): Promise<SocialLink | SocialLinkError>
  findById(id: string): Promise<SocialLink | null>
  findAll(query: GetSocialLinksDto): Promise<PaginateOutput<SocialLink>>
  put(socialLink: SocialLink): Promise<SocialLink | SocialLinkError>
  delete(id: string): Promise<boolean | SocialLinkError>
  //   update(id: string, socialLinkModel: ISocialLinkModel): Promise<void>
}

@Injectable()
export class SocialLinkRepository implements ISocialLinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(alias: string): Promise<boolean> {
    return !!(await this.prisma.socialLink.findUnique({
      where: { alias },
    }))
  }

  async findById(id: string): Promise<SocialLink | null> {
    const socialLink = await this.prisma.socialLink.findUnique({
      where: { id },
      include: { creator: { include: { guest: true } } },
    })

    return socialLink
      ? SocialLinkMapper.toDomain(socialLink as SocialLinkModel)
      : null
  }

  async findAll(dto: GetSocialLinksDto): Promise<PaginateOutput<SocialLink>> {
    const { size, page, ...filter } = dto

    const [socialLinks, total] = await Promise.all([
      await this.prisma.socialLink.findMany({
        ...paginate({ size, page }),
        where: {
          title: filter.title
            ? {
                contains: filter.title,
              }
            : undefined,
          alias: filter.alias
            ? {
                equals: filter.alias,
              }
            : undefined,
          href: filter.href
            ? {
                contains: filter.href,
              }
            : undefined,
          icon: filter.icon
            ? {
                contains: filter.icon,
              }
            : undefined,
          creatorId: filter.creatorId
            ? {
                equals: filter.creatorId,
              }
            : undefined,
        },
      }),
      await this.prisma.socialLink.count(),
    ])

    return paginateOutput<SocialLink>(
      socialLinks.map((link) =>
        SocialLinkMapper.toDomain(link as unknown as SocialLinkModel)
      ),
      total,
      { size, page }
    )
  }

  async create(socialLink: SocialLink): Promise<SocialLink | SocialLinkError> {
    const { creatorId, ...data } = SocialLinkMapper.toTable(socialLink)

    try {
      const newSocialLink = await this.prisma.socialLink.create({
        data: {
          ...data,
          creator: {
            connect: {
              id: creatorId,
            },
          },
        },
        include: { creator: { include: { guest: true } } },
      })

      return SocialLinkMapper.toDomain(
        newSocialLink as unknown as SocialLinkModel
      )
    } catch {
      return new SocialLinkError('SOCIAL_LINK_BAD_CREATOR')
    }
  }

  async put(socialLink: SocialLink): Promise<SocialLink | SocialLinkError> {
    const { creatorId, ...data } = SocialLinkMapper.toTable(socialLink)

    try {
      const res = await this.prisma.socialLink.update({
        where: {
          id: data.id!,
        },
        data: {
          ...data,
          creator: creatorId
            ? {
                connect: {
                  id: creatorId,
                },
              }
            : undefined,
        },
        include: {
          creator: {
            include: {
              guest: true,
            },
          },
        },
      })

      return SocialLinkMapper.toDomain(res as unknown as SocialLinkModel)
    } catch {
      return new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
    }
  }

  async delete(id: string): Promise<boolean | SocialLinkError> {
    try {
      return !!(await this.prisma.socialLink.delete({ where: { id } }))
    } catch {
      return new SocialLinkError('SOCIAL_LINK_NOT_FOUND')
    }
  }
}
