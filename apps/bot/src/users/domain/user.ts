import { User as PrismaUser } from '#prisma'
import { AggregateRoot } from '@nestjs/cqrs'

export class User extends AggregateRoot {
  public static fromModel(user: PrismaUser) {
    console.log(user)
  }

  public toModel(): PrismaUser {
    return {
      createdAt: new Date(),
      id: 1,
      isTelegramVerified: false,
      login: '',
      name: '',
      password: '',
      role: 'ADMIN',
      status: 'ACCEPTED',
      telegramId: 1,
    }
  }
}
