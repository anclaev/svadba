import { Command } from '@nestjs/cqrs'

import { RegistrationLinkError } from '../../../domain'

export class DeleteRegistrationLinkCommand extends Command<
  boolean | RegistrationLinkError
> {
  constructor(public id: string) {
    super()
  }
}
