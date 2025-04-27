import { Query } from '@nestjs/cqrs'

import { RegistrationLink, RegistrationLinkError } from '../../../domain'

export class RegistrationLinkByIdQuery extends Query<
  RegistrationLink | RegistrationLinkError
> {
  constructor(public readonly id: string) {
    super()
  }
}
