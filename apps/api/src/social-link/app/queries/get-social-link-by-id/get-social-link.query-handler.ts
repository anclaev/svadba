import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkRepository } from '#/social-link/infra'

import { GetSocialLinkByIdQuery } from './get-social-link-by-id.query'

@QueryHandler(GetSocialLinkByIdQuery)
export class GetSocialLinkByIdQueryHandler
  implements IQueryHandler<GetSocialLinkByIdQuery, SocialLink | null>
{
  constructor(private repo: SocialLinkRepository) {}

  async execute({
    socialLinkId,
  }: GetSocialLinkByIdQuery): Promise<SocialLink | null> {
    return await this.repo.findById(socialLinkId)
  }
}
