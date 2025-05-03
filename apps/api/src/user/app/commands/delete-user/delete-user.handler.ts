import { User, UserError, UserRepository } from '#/user/domain'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from './delete-user.command'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, User | UserError>
{
  constructor(private readonly repository: UserRepository) {}

  async execute({ dto }: DeleteUserCommand): Promise<boolean | UserError> {
    const res = await this.repository.delete(dto.id)

    return res ? res : new UserError('USER_NOT_FOUND')
  }
}
