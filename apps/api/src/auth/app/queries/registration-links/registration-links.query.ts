import { Query } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { RegistrationLink, RegistrationLinkError } from '../../../domain'

import { RegistrationLinksDto } from './registration-links.dto'

export class RegistrationLinksQuery extends Query<
  IPaginationResult<RegistrationLink> | RegistrationLinkError
> {
  constructor(public readonly dto: RegistrationLinksDto) {
    super()
  }
}
