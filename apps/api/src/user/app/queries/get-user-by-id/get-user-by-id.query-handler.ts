import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetUserByIdQuery } from './get-user-by-id.query'

import type { User } from '#/user/domain/User'
import { UserRepository } from '#/user/infra'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery, User | null>
{
  constructor(private repo: UserRepository) {}

  async execute({ userId }: GetUserByIdQuery): Promise<User | null> {
    return await this.repo.findById(userId)
  }
}
