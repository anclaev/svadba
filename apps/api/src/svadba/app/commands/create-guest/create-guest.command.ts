import { Command } from '@nestjs/cqrs'

import { Guest, GuestError } from '../../../domain'

import { CreateGuestInput } from './create-guest.input'

export class CreateGuestCommand extends Command<Guest | GuestError> {
  constructor(public readonly dto: CreateGuestInput) {
    super()
  }
}
