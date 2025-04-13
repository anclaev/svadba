import { Query } from '@nestjs/cqrs'

import { SocialLink, SocialLinkError } from '#/social-link/domain'

export class SocialLinkByIdQuery extends Query<SocialLink | SocialLinkError> {
  constructor(public readonly id: string) {
    super()
  }
}
