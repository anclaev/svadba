import { Query } from '@nestjs/cqrs'

import type { PaginateOutput } from '#/common/pagination'

import { SocialLink } from '#/social-link/domain/SocialLink'

import { GetSocialLinksDto } from './get-social-links.dto'

export class GetSocialLinksQuery extends Query<PaginateOutput<SocialLink>> {
  constructor(public readonly dto: GetSocialLinksDto) {
    super()
  }
}
