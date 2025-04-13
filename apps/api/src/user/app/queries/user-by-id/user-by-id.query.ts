import { Query } from '@nestjs/cqrs'

import { User, UserError } from '#/user/domain'

export class UserByIdQuery extends Query<User | UserError> {
  constructor(public readonly id: string) {
    super()
  }
}
