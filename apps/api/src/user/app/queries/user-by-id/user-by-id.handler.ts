import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { User, UserError, UserRepository } from '#/user/domain'

import { UserByIdQuery } from './user-by-id.query'

@QueryHandler(UserByIdQuery)
export class UserByIdHandler implements IQueryHandler<UserByIdQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute({ id }: UserByIdQuery): Promise<User | UserError> {
    return this.repository.findById(id)
  }
}
