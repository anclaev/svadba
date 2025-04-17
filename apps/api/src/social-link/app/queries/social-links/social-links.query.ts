import { Query } from '@nestjs/cqrs'

import { IPaginationResult } from '@repo/shared'

import { SocialLink, SocialLinkError } from '#/social-link/domain'

import { SocialLinksDto } from './social-links.dto'

export class SocialLinksQuery extends Query<
  IPaginationResult<SocialLink> | SocialLinkError
> {
  constructor(public readonly dto: SocialLinksDto) {
    super()
  }
}
