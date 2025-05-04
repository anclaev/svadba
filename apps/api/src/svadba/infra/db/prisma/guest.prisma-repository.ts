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
          user: undefined,
          userId,
        },
        include: { user: true },
      })

      return GuestPrismaMapper.toEntity(
        createdGuest as unknown as IGuestPrismaModel
      )
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
          user: undefined,
          answers: model.answers
            ? (model.answers as InputJsonValue)
            : undefined,
          userId: model.userId,
          updatedAt: new Date(),
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

  async exists(userId: string): Promise<boolean | GuestError> {
    try {
      return !!(await this.prisma.guest.findUnique({ where: { userId } }))
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
    const where = {
      side: queryParams.side
        ? {
            equals: queryParams.side,
          }
        : undefined,
      role: queryParams.guestRole
        ? {
            equals: queryParams.guestRole,
          }
        : undefined,
      user: {
        status: queryParams.status
          ? {
              equals: queryParams.status,
            }
          : undefined,
        role: queryParams.role
          ? {
              equals: queryParams.role,
            }
          : undefined,
        login: queryParams.login
          ? {
              contains: queryParams.login,
            }
          : undefined,
        name: queryParams.name
          ? {
              contains: queryParams.name,
            }
          : undefined,
        isTelegramVerified: queryParams.isTelegramVerified
          ? {
              equals: queryParams.isTelegramVerified,
            }
          : undefined,
      },
    }

    try {
      const [guests, total] = await Promise.all([
        await this.prisma.guest.findMany({
          ...paginate(paginationParams),
          where,
          include: { user: true },
        }),
        await this.prisma.guest.count({
          where,
        }),
      ])

      return paginateOutput<Guest>(
        (guests as unknown as IGuestPrismaModel[]).map((guest) =>
          GuestPrismaMapper.toEntity(guest)
        ),
        total,
        paginationParams
      )
    } catch {
      return new GuestError('GUEST_UNKNOWN_ERROR')
    }
  }
}
