import { Query } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'

export class GetSocialLinkByIdQuery extends Query<SocialLink | null> {
  constructor(public readonly socialLinkId: string) {
    super()
  }
}
