import { Command } from '@nestjs/cqrs'

import { User } from '#/user/domain/User'
import { UserError } from '#/user/infra'

import type { CreateUserDto } from './create-user.dto'

export class CreateUserCommand extends Command<User | UserError> {
  constructor(public dto: CreateUserDto) {
    super()
  }
}
