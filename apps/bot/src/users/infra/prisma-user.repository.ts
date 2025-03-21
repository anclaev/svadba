import { Injectable } from '@nestjs/common'

import { PrismaService } from '#/core/prisma.service'

import { User } from '../domain/user'
import { UserRepository } from '../domain/user.repository'

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(user: User): Promise<User | null> {
    const isExistingUser = await this.prisma.user.findUnique({
      where: {
        login: user.login,
      },
      include: {
        guest: true,
      },
    })

    if (isExistingUser) {
      return new Promise((resolve) => resolve(null))
    }

    const userModel = user.toModel()

    const createdUserModel = await this.prisma.user.create({
      data: {
        id: userModel.id,
        telegramId: userModel.telegramId,
        login: userModel.login!,
        name: userModel.name!,
        password: userModel.password!,
        role: userModel.role,
        status: userModel.status,
        isTelegramVerified: userModel.isTelegramVerified,
        guest: {
          create: {
            role: userModel.guest!.role,
            side: userModel.guest!.side!,
            answers: userModel.guest!.answers!,
          },
        },
      },
      include: {
        guest: true,
      },
    })

    user.fromModel(createdUserModel)

    return user
  }

  // findById(id: string): User {
  //   console.log(id)
  //   return new User()
  // }
}
