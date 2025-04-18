import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { Guest, GuestError, GuestRepository } from '../../../domain'

import { GuestByUserIdQuery } from './guest-by-user-id.query'

@QueryHandler(GuestByUserIdQuery)
export class GuestByUserIdHandler implements IQueryHandler<GuestByUserIdQuery> {
  constructor(private readonly repository: GuestRepository) {}

  async execute({ userId }: GuestByUserIdQuery): Promise<Guest | GuestError> {
    return this.repository.findByUserId(userId)
  }
}
