import { Command } from '@nestjs/cqrs'

import { CreateUserInput } from '../../../app'
import { User, UserError } from '../../../domain'

export class CreateUserCommand extends Command<User | UserError> {
  constructor(public readonly dto: CreateUserInput) {
    super()
  }
}
