import { Query } from '@nestjs/cqrs'
import { IPaginationResult } from '@repo/shared'

import { Guest, GuestError } from '#/svadba/domain'
import { GuestsDto } from './guests.dto'

export class GuestsQuery extends Query<IPaginationResult<Guest> | GuestError> {
  constructor(public readonly dto: GuestsDto) {
    super()
  }
}
