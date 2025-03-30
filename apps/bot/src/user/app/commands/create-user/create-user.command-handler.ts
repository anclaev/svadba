import { UserRole, UserStatus } from '#prisma'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as argon2 from 'argon2'

import { Guest, User } from '#/user/domain'
import { UserError, UserRepository } from '#/user/infra'

import { CreateUserCommand } from './create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly repo: UserRepository) {}

  async execute({ dto }: CreateUserCommand): Promise<User | UserError> {
    const { guestRole, guestSide, guestAnswers, ...data } = dto

    if (await this.repo.exists(dto.login.trim())) {
      return new UserError('USER_ALREADY_EXISTS')
    }

    const user = User.create({
      ...data,
      status: UserStatus.CREATED,
      role: UserRole.PUBLIC,
      telegramId: null,
      isTelegramVerified: false,
      credentials: [],
      password: await argon2.hash(data.password),
      guest: Guest.create({
        side: guestSide,
        answers: guestAnswers,
        role: guestRole,
      }),
    })

    const savedUser = await this.repo.create(user)

    return savedUser
  }
}
