import { Injectable } from '@nestjs/common'
import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IRegistrationLinkPrismaModel } from '#/common/models'
import { paginate, paginateOutput } from '#/common/pagination'

import { PrismaService } from '#/core/prisma.service'

import {
  IRegistrationLinkQueryParams,
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkMeta,
  RegistrationLinkRepository,
} from '#/auth/domain'

import { RegistrationLinkPrismaMapper } from './registration-link.prisma-mapper'

@Injectable()
export class RegistrationLinkPrismaRepository extends RegistrationLinkRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(
    entity: RegistrationLink
  ): Promise<RegistrationLink | RegistrationLinkError> {
    const { ownerId, ...model } = RegistrationLinkPrismaMapper.toModel(entity)

    try {
      const createdRegistrationLink = await this.prisma.registrationLink.create(
        {
          data: {
            ...model,
            meta: model.meta || {},
            ownerId: undefined,
            owner: {
              connect: {
                id: ownerId,
              },
            },
          },
          include: { owner: true },
        }
      )

      return RegistrationLinkPrismaMapper.toEntity(createdRegistrationLink)
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')
    }
  }

  async update(
    entity: RegistrationLink
  ): Promise<RegistrationLink | RegistrationLinkError> {
    const model = RegistrationLinkPrismaMapper.toModel(entity)

    try {
      const updatedRegistrationLink = await this.prisma.registrationLink.update(
        {
          where: {
            id: model.id,
          },
          data: {
            ...model,
            meta: model.meta || {},
            ownerId: undefined,
            owner: {
              connect: {
                id: model.ownerId,
              },
            },
          },
          include: { owner: true },
        }
      )

      return RegistrationLinkPrismaMapper.toEntity(updatedRegistrationLink)
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | RegistrationLinkError> {
    try {
      return !!(await this.prisma.registrationLink.delete({ where: { id } }))
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
    }
  }

  async deleteExpired(date: Date): Promise<number | RegistrationLinkError> {
    try {
      return (
        await this.prisma.registrationLink.deleteMany({
          where: {
            expiresAt: {
              lt: date,
            },
          },
        })
      ).count
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')
    }
  }

  async exists(id: string): Promise<boolean | RegistrationLinkError> {
    try {
      return !!(await this.prisma.registrationLink.findUnique({
        where: { id },
      }))
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
    }
  }

  async findById(
    id: string
  ): Promise<RegistrationLink | RegistrationLinkError> {
    try {
      const RegistrationLink = await this.prisma.registrationLink.findUnique({
        where: { id },
        include: { owner: true },
      })

      return RegistrationLink
        ? RegistrationLinkPrismaMapper.toEntity(RegistrationLink)
        : new RegistrationLinkError('REGISTRATION_LINK_NOT_FOUND')
    } catch {
      return new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: IRegistrationLinkQueryParams
  ): Promise<IPaginationResult<RegistrationLink> | RegistrationLinkError> {
    const query = queryParams.meta ? this.createMetaQuery(queryParams.meta) : []
    const where = {
      isActive: queryParams.isActive
        ? {
            equals: queryParams.isActive,
          }
        : undefined,
      status: queryParams.status
        ? {
            equals: queryParams.status,
          }
        : undefined,
      ownerId: queryParams.ownerId
        ? {
            equals: queryParams.ownerId,
          }
        : undefined,
      AND: query,
    }

    try {
      const [registrationLinks, total] = await Promise.all([
        await this.prisma.registrationLink.findMany({
          ...paginate(paginationParams),
          where,
        }),
        await this.prisma.registrationLink.count({ where }),
      ])

      return paginateOutput<RegistrationLink>(
        (registrationLinks as IRegistrationLinkPrismaModel[]).map(
          (registrationLink) =>
            RegistrationLinkPrismaMapper.toEntity(registrationLink)
        ),
        total,
        paginationParams
      )
    } catch (e) {
      console.log(e)

      return new RegistrationLinkError('REGISTRATION_LINK_UNKNOWN_ERROR')
    }
  }

  private createMetaQuery(meta: RegistrationLinkMeta): any[] {
    const query = []

    for (const key of Object.keys(meta)) {
      // Уникальные поле
      if (key === 'login') {
        query.push({
          meta: {
            path: ['login'],
            equals: meta[key] as string,
          },
        })
      } else {
        query.push({
          meta: {
            path: [key],
            string_contains: meta[key as keyof typeof meta] as string,
          },
        })
      }
    }

    return query
  }
}
