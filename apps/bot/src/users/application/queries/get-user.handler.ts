import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetUserQuery } from './get-user.query'

import type { User } from '#/users/domain/user'
import { UserRepository } from '#/users/domain/user.repository'

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, User | null>
{
  constructor(private repo: UserRepository) {}

  execute({ userId }: GetUserQuery): Promise<User | null> {
    return this.repo.findById(userId)
  }
}
