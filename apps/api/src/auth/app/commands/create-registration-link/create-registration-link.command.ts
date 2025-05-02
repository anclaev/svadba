import { Command } from '@nestjs/cqrs'

import { RegistrationLink, RegistrationLinkError } from '../../../domain'

import { CreateRegistrationLinkInput } from './create-registration-link.input'

export class CreateRegistrationLinkCommand extends Command<
  RegistrationLink | RegistrationLinkError
> {
  constructor(public dto: CreateRegistrationLinkInput) {
    super()
  }
}
