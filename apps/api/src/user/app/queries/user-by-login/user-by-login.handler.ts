import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { User, UserError, UserRepository } from '#/user/domain'

import { UserByLoginQuery } from './user-by-login.query'

@QueryHandler(UserByLoginQuery)
export class UserByLoginHandler implements IQueryHandler<UserByLoginQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute({ login }: UserByLoginQuery): Promise<User | UserError> {
    return this.repository.findByLogin(login)
  }
}
