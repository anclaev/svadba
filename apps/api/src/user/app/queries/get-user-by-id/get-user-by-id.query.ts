import { Query } from '@nestjs/cqrs'

import { User } from '#/user/domain'

export class GetUserByIdQuery extends Query<User | null> {
  constructor(public readonly userId: string) {
    super()
  }
}
