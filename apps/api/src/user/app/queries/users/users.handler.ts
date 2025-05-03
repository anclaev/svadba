import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { User, UserError, UserRepository } from '#/user/domain'

import { UsersQuery } from './users.query'

@QueryHandler(UsersQuery)
export class UsersHandler
  implements IQueryHandler<UsersQuery, IPaginationResult<User> | UserError>
{
  constructor(private repository: UserRepository) {}

  async execute({
    dto,
  }: UsersQuery): Promise<IPaginationResult<User> | UserError> {
    const { page, size, ...queryParams } = dto

    return await this.repository.findMore({ page, size }, queryParams)
  }
}
