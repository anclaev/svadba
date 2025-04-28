import { Query } from '@nestjs/cqrs'

import { RegistrationLink, RegistrationLinkError } from '../../../domain'

import { RegistrationLinksByMetaDto } from './registration-links-by-meta.dto'

export class RegistrationLinksByMetaQuery extends Query<
  RegistrationLink[] | RegistrationLinkError
> {
  constructor(public readonly dto: RegistrationLinksByMetaDto) {
    super()
  }
}
