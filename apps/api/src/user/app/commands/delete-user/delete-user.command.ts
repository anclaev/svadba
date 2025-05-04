import { Command } from '@nestjs/cqrs'

import { UserError } from '#/user/domain'

import { DeleteUserInput } from './delete-user.input'

export class DeleteUserCommand extends Command<boolean | UserError> {
  constructor(public dto: DeleteUserInput) {
    super()
  }
}
