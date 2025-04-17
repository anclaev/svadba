import { Injectable } from '@nestjs/common'
import { InputJsonValue } from '@prisma/client/runtime/library'
import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IGuestPrismaModel } from '#/common/models'
import { paginate, paginateOutput } from '#/common/pagination'

import { PrismaService } from '#/core/prisma.service'

import {
  Guest,
  GuestError,
  GuestRepository,
  IGuestQueryParams,
} from '#/svadba/domain'

import { GuestPrismaMapper } from './guest.prisma-mapper'

@Injectable()
export class GuestPrismaRepository extends GuestRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(entity: Guest): Promise<Guest | GuestError> {
    const { userId, ...model } = GuestPrismaMapper.toModel(entity)

    try {
      const createdGuest = await this.prisma.guest.create({
        data: {
          ...model,
          answers: model.answers as InputJsonValue,
          userId,
        },
        include: { user: true },
      })

      return GuestPrismaMapper.toEntity(createdGuest as IGuestPrismaModel)
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }

  async update(entity: Guest): Promise<Guest | GuestError> {
    const model = GuestPrismaMapper.toModel(entity)

    try {
      const updatedGuest = await this.prisma.guest.update({
        where: {
          id: model.id,
        },
        data: {
          ...model,
          answers: model.answers
            ? (model.answers as InputJsonValue)
            : undefined,
          userId: model.userId,
        },
      })

      return GuestPrismaMapper.toEntity(updatedGuest as IGuestPrismaModel)
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | GuestError> {
    try {
      return !!(await this.prisma.guest.delete({ where: { id } }))
    } catch {
      return new GuestError('GUEST_NOT_FOUND')
    }
  }

  async exists(id: string): Promise<boolean | GuestError> {
    try {
      return !!(await this.prisma.guest.findUnique({ where: { id } }))
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<Guest | GuestError> {
    try {
      const Guest = await this.prisma.guest.findUnique({
        where: { id },
      })

      return Guest
        ? GuestPrismaMapper.toEntity(Guest as IGuestPrismaModel)
        : new GuestError('GUEST_NOT_FOUND')
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }

  async findByUserId(userId: string): Promise<Guest | GuestError> {
    try {
      const Guest = await this.prisma.guest.findUnique({
        where: { userId },
      })

      return Guest
        ? GuestPrismaMapper.toEntity(Guest as IGuestPrismaModel)
        : new GuestError('GUEST_NOT_FOUND')
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: IGuestQueryParams
  ): Promise<IPaginationResult<Guest> | GuestError> {
    try {
      const [guests, total] = await Promise.all([
        await this.prisma.guest.findMany({
          ...paginate(paginationParams),
          where: {
            side: queryParams.side
              ? {
                  in: queryParams.side,
                }
              : undefined,
            role: queryParams.role
              ? {
                  in: queryParams.role,
                }
              : undefined,
          },
        }),
        await this.prisma.guest.count(),
      ])

      return paginateOutput<Guest>(
        (guests as IGuestPrismaModel[]).map((timingEvent) =>
          GuestPrismaMapper.toEntity(timingEvent)
        ),
        total,
        paginationParams
      )
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }
}
