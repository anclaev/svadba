import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { Guest, GuestError, GuestRepository } from '../../../domain'

import { GuestByIdQuery } from './guest-by-id.query'

@QueryHandler(GuestByIdQuery)
export class GuestByIdHandler implements IQueryHandler<GuestByIdQuery> {
  constructor(private readonly repository: GuestRepository) {}

  async execute({ id }: GuestByIdQuery): Promise<Guest | GuestError> {
    return this.repository.findById(id)
  }
}
