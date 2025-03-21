import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserRepository } from '#/users/domain/user.repository'

import { User } from '#/users/domain/user'
import { CreateUserCommand } from './create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private repository: UserRepository) {}

  async execute(): Promise<User> {
    const user = new User()

    await this.repository.save(user)

    user.commit()

    return user
  }
}
