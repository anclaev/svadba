import { Injectable } from '@nestjs/common'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

import { IUserPrismaModel } from '#/common/models'
import { paginate, paginateOutput } from '#/common/pagination'

import { PrismaService } from '#/core/prisma.service'

import {
  IUserQueryParams,
  User,
  UserError,
  UserRepository,
} from '../../../domain'

import { UserPrismaMapper } from '../../../infra'

@Injectable()
export class UserPrismaRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(entity: User): Promise<User | UserError> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { guestId: _, ...model } = UserPrismaMapper.toModel(entity)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: __, ...guest } = model.guest

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          ...model,
          credentials: model.credentials as InputJsonValue[],
          guest: {
            create: {
              ...guest,
              answers: model.guest.answers as InputJsonValue[],
            },
          },
        },
        include: { guest: true },
      })

      return UserPrismaMapper.toEntity(createdUser as IUserPrismaModel)
    } catch (e) {
      console.log(e)
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }

  async update(entity: User): Promise<User | UserError> {
    const model = UserPrismaMapper.toModel(entity)

    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: model.id,
        },
        data: {
          ...model,
          credentials: <InputJsonValue[]>model.credentials,
          guest: model.guestId
            ? {
                connect: {
                  id: model.guestId,
                },
              }
            : undefined,
        },
        include: { guest: true },
      })

      return UserPrismaMapper.toEntity(updatedUser as IUserPrismaModel)
    } catch {
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }

  async delete(id: string): Promise<boolean | UserError> {
    try {
      return !!(await this.prisma.user.delete({ where: { id } }))
    } catch {
      return new UserError('USER_NOT_FOUND')
    }
  }

  async exists(login: string): Promise<boolean | UserError> {
    try {
      return !!(await this.prisma.user.findUnique({ where: { login } }))
    } catch {
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }

  async findById(id: string): Promise<User | UserError> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } })

      return user
        ? UserPrismaMapper.toEntity(user as IUserPrismaModel)
        : new UserError('USER_NOT_FOUND')
    } catch {
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }

  async findByLogin(login: string): Promise<User | UserError> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { login: login.trim() },
      })

      return user
        ? UserPrismaMapper.toEntity(user as IUserPrismaModel)
        : new UserError('USER_NOT_FOUND')
    } catch (e) {
      console.log(e)
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }

  async findMore(
    paginationParams: IPaginationParams,
    queryParams: IUserQueryParams
  ): Promise<IPaginationResult<User> | UserError> {
    try {
      const [users, total] = await Promise.all([
        await this.prisma.user.findMany({
          ...paginate(paginationParams),
          where: {
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
            guest: {
              side: queryParams.guestSide
                ? {
                    equals: queryParams.guestSide,
                  }
                : undefined,
              role: queryParams.guestRole
                ? {
                    equals: queryParams.guestRole,
                  }
                : undefined,
            },
          },
        }),
        await this.prisma.user.count(),
      ])

      return paginateOutput<User>(
        (users as IUserPrismaModel[]).map((user) =>
          UserPrismaMapper.toEntity(user)
        ),
        total,
        paginationParams
      )
    } catch {
      return new UserError('USER_UNKNOWN_ERROR')
    }
  }
}
