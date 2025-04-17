import { User, UserError } from '#/user/domain'
import { Query } from '@nestjs/cqrs'

export class UserByLoginQuery extends Query<User | UserError> {
  constructor(public readonly login: string) {
    super()
  }
}
