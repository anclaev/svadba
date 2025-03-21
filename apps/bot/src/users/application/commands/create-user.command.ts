import { Command } from '@nestjs/cqrs'

import { User } from '#/users/domain/user'

export class CreateUserCommand extends Command<User> {
  constructor() {
    super()
  }
}
