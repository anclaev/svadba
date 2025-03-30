import { Query } from '@nestjs/cqrs'

import type { User } from '#/old_users/domain/user'

export class GetUserQuery extends Query<User | null> {
  constructor(public readonly userId: string) {
    super()
  }
}
