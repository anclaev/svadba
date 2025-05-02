import { Command } from '@nestjs/cqrs'

import { RegistrationLink, RegistrationLinkError } from '../../../domain'

import { UpdateRegistrationLinkInput } from './update-registration-link.input'

export class UpdateRegistrationLinkCommand extends Command<
  RegistrationLink | RegistrationLinkError
> {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRegistrationLinkInput
  ) {
    super()
  }
}
