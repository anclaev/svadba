import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import {
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { DeleteRegistrationLinkCommand } from './delete-registration-link.command'

@CommandHandler(DeleteRegistrationLinkCommand)
export class DeleteRegistrationLinkHandler
  implements
    ICommandHandler<
      DeleteRegistrationLinkCommand,
      boolean | RegistrationLinkError
    >
{
  constructor(private repository: RegistrationLinkRepository) {}

  async execute({
    id,
  }: DeleteRegistrationLinkCommand): Promise<boolean | RegistrationLinkError> {
    return this.repository.delete(id)
  }
}
