import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import {
  SocialLink,
  SocialLinkError,
  SocialLinkRepository,
} from '#/social-link/domain'

import { SocialLinkByIdQuery } from './social-link-by-id.query'

@QueryHandler(SocialLinkByIdQuery)
export class SocialLinkByIdQueryHandler
  implements IQueryHandler<SocialLinkByIdQuery, SocialLink | SocialLinkError>
{
  constructor(private repository: SocialLinkRepository) {}

  async execute({
    id,
  }: SocialLinkByIdQuery): Promise<SocialLink | SocialLinkError> {
    return await this.repository.findById(id)
  }
}
