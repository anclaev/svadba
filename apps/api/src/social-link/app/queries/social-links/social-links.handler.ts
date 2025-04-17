import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { IPaginationResult } from '@repo/shared'

import {
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { SocialLinksQuery } from './social-links.query'

@QueryHandler(SocialLinksQuery)
export class SocialLinksHandler
  implements
    IQueryHandler<
      SocialLinksQuery,
      IPaginationResult<SocialLink> | SocialLinkError
    >
{
  constructor(private repository: SocialLinkRepository) {}

  async execute({
    dto,
  }: SocialLinksQuery): Promise<
    IPaginationResult<SocialLink> | SocialLinkError
  > {
    const { page, size, ...queryParams } = dto

    return await this.repository.findMore({ page, size }, queryParams)
  }
}
