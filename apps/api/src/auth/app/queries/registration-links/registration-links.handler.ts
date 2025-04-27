import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { destructObject } from '#/common/utils'

import {
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { RegistrationLinksQuery } from './registration-links.query'

@QueryHandler(RegistrationLinksQuery)
export class RegistrationLinksHandler
  implements
    IQueryHandler<
      RegistrationLinksQuery,
      IPaginationResult<RegistrationLink> | RegistrationLinkError
    >
{
  constructor(private repository: RegistrationLinkRepository) {}

  async execute({
    dto,
  }: RegistrationLinksQuery): Promise<
    IPaginationResult<RegistrationLink> | RegistrationLinkError
  > {
    const { page, size, ...queryParams } = dto

    const destructedQuery = destructObject(queryParams, 'meta')

    return await this.repository.findMore({ page, size }, destructedQuery)
  }
}
