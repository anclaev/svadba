import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import {
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { RegistrationLinksByMetaQuery } from './registration-links-by-meta.query'

@QueryHandler(RegistrationLinksByMetaQuery)
export class RegistrationLinksByMetaHandler
  implements
    IQueryHandler<
      RegistrationLinksByMetaQuery,
      RegistrationLink[] | RegistrationLinkError
    >
{
  constructor(private repository: RegistrationLinkRepository) {}

  async execute({
    dto,
  }: RegistrationLinksByMetaQuery): Promise<
    RegistrationLink[] | RegistrationLinkError
  > {
    return await this.repository.findByMeta(dto)
  }
}
