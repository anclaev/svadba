import { Query } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { User, UserError } from '#/user/domain'
import { UsersDto } from './users.dto'

export class UsersQuery extends Query<IPaginationResult<User> | UserError> {
  constructor(public readonly dto: UsersDto) {
    super()
  }
}
