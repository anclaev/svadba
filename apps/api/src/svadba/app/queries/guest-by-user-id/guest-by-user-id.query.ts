import { Query } from '@nestjs/cqrs'

import { Guest, GuestError } from '../../../domain'

export class GuestByUserIdQuery extends Query<Guest | GuestError> {
  constructor(public readonly userId: string) {
    super()
  }
}
