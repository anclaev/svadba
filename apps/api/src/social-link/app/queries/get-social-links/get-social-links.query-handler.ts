import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import type { PaginateOutput } from '#/common/pagination'

import { SocialLink } from '#/social-link/domain/SocialLink'
import { SocialLinkRepository } from '#/social-link/infra'

import { GetSocialLinksQuery } from './get-social-links.query'

@QueryHandler(GetSocialLinksQuery)
export class GetSocialLinksQueryHandler
  implements IQueryHandler<GetSocialLinksQuery, PaginateOutput<SocialLink>>
{
  constructor(private repo: SocialLinkRepository) {}

  async execute({
    dto,
  }: GetSocialLinksQuery): Promise<PaginateOutput<SocialLink>> {
    return await this.repo.findAll(dto)
  }
}
