import { Command } from '@nestjs/cqrs'

import { User } from '#/old_users/domain/user'

import { CreateUserDto } from '#/old_users/api/dtos/create-user.dto'
import { UserError } from '#/old_users/infra/errors'

export class CreateUserCommand extends Command<User | UserError> {
  constructor(public readonly dto: CreateUserDto) {
    super()
  }
}
