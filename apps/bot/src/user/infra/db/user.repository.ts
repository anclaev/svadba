import { Injectable } from '@nestjs/common'
import { InputJsonValue } from '@prisma/client/runtime/library'

import { PrismaService } from '#/core/prisma.service'

import { User } from '#/user/domain/User'
import { UserModel } from '../interfaces'
import { UserMapper } from '../mappers'

interface IUserRepository {
  exists(login: string): Promise<boolean>
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByLogin(login: string): Promise<User | null>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(login: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({ where: { login } }))
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { guest: true },
    })

    return user ? UserMapper.toDomain(user as UserModel) : null
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { login },
      include: { guest: true },
    })

    return user ? UserMapper.toDomain(user as UserModel) : null
  }

  async create(user: User): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { guest, guestId, createdAt, ...data } = UserMapper.toTable(user)

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        credentials: data.credentials as InputJsonValue[],
        guest: {
          create: {
            ...guest,
            answers: guest.answers as InputJsonValue[],
          },
        },
      },
      include: { guest: true },
    })

    return UserMapper.toDomain(newUser as unknown as UserModel)
  }
}
