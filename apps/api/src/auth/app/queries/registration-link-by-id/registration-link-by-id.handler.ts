import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import {
  RegistrationLink,
  RegistrationLinkError,
  RegistrationLinkRepository,
} from '../../../domain'

import { RegistrationLinkByIdQuery } from './registration-link-by-id.query'

@QueryHandler(RegistrationLinkByIdQuery)
export class RegistrationLinkByIdHandler
  implements
    IQueryHandler<
      RegistrationLinkByIdQuery,
      RegistrationLink | RegistrationLinkError
    >
{
  constructor(private repository: RegistrationLinkRepository) {}

  async execute({
    id,
  }: RegistrationLinkByIdQuery): Promise<
    RegistrationLink | RegistrationLinkError
  > {
    return await this.repository.findById(id)
  }
}
