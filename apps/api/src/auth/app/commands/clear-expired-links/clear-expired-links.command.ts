import { Command } from '@nestjs/cqrs'

import { RegistrationLinkError } from '../../../domain'

import { ClearExpiredLinksInput } from './clear-expired-links.input'

export class ClearExpiredLinksCommand extends Command<
  number | RegistrationLinkError
> {
  constructor(public dto: ClearExpiredLinksInput) {
    super()
  }
}
