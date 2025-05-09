import { UserRole, UserStatus } from '#prisma'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as argon2 from 'argon2'
import { v4 } from 'uuid'

import { User, UserError, UserRepository } from '#/user/domain'

import { CreateUserCommand } from './create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute({ dto }: CreateUserCommand): Promise<User | UserError> {
    if (await this.repository.exists(dto.login.trim())) {
      return new UserError('USER_ALREADY_EXISTS')
    }

    const id = v4()

    const user = User.create({
      id,
      login: dto.login,
      name: dto.name || null,
      status: UserStatus.CREATED,
      role: UserRole.PUBLIC,
      telegramId: null,
      isTelegramVerified: false,
      credentials: [],
      password: await argon2.hash(dto.password),
    })

    const createdUser = await this.repository.create(user)

    if (createdUser instanceof User) {
      createdUser.commit()
    }

    return createdUser
  }
}
