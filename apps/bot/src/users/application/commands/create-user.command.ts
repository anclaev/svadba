import { Command } from '@nestjs/cqrs'

import { User } from '#/users/domain/user'

import { CreateUserDto } from '#/users/api/dtos/create-user.dto'
import { UserError } from '#/users/infra/errors'

export class CreateUserCommand extends Command<User | UserError> {
  constructor(public readonly dto: CreateUserDto) {
    super()
  }
}
