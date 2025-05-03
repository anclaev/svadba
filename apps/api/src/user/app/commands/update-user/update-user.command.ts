import { Command } from '@nestjs/cqrs'

import { User, UserError } from '#/user/domain'

import { UpdateUserInput } from './update-user.input'

export class UpdateUserCommand extends Command<User | UserError> {
  constructor(
    public id: string,
    public dto: UpdateUserInput
  ) {
    super()
  }
}
