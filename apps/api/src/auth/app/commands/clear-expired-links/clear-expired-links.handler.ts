import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import {
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { ClearExpiredLinksCommand } from './clear-expired-links.command'

@CommandHandler(ClearExpiredLinksCommand)
export class ClearExpiredLinksHandler
  implements
    ICommandHandler<ClearExpiredLinksCommand, number | RegistrationLinkError>
{
  constructor(private readonly repository: RegistrationLinkRepository) {}

  async execute({
    dto,
  }: ClearExpiredLinksCommand): Promise<number | RegistrationLinkError> {
    return await this.repository.deleteExpired(dto.date)
  }
}
