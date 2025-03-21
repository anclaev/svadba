import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import * as argon2 from 'argon2'

import { User } from '#/users/domain/user'
import { UserRepository } from '#/users/domain/user.repository'

import { CreateUserCommand } from './create-user.command'

import { UserError } from '#/users/infra/errors'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private repository: UserRepository) {}

  async execute({ dto }: CreateUserCommand): Promise<User | UserError> {
    const hashedPassword = await argon2.hash(dto.password)

    const user = new User({
      ...dto,
      password: hashedPassword,
    })

    const result = await this.repository.create(user)

    if (!result) {
      return UserError.USER_ALREADY_EXISTS
    }

    result.commit()

    return result
  }
}
