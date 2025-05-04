import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { Guest, GuestError, GuestRepository } from '../../../domain'

import { GuestsQuery } from './guests.query'

@QueryHandler(GuestsQuery)
export class GuestsHandler
  implements IQueryHandler<GuestsQuery, IPaginationResult<Guest> | GuestError>
{
  constructor(private repository: GuestRepository) {}

  async execute({
    dto,
  }: GuestsQuery): Promise<IPaginationResult<Guest> | GuestError> {
    const { page, size, ...queryParams } = dto

    return await this.repository.findMore({ page, size }, queryParams)
  }
}
