import { Query } from '@nestjs/cqrs'

import { Guest, GuestError } from '../../../domain'

export class GuestByIdQuery extends Query<Guest | GuestError> {
  constructor(public readonly id: string) {
    super()
  }
}
