import { Command } from '@nestjs/cqrs'

import { Guest, GuestError } from '../../../domain'

import { RegisterGuestInput } from './register-guest.input'

export class RegisterGuestCommand extends Command<Guest | GuestError> {
  constructor(public readonly dto: RegisterGuestInput) {
    super()
  }
}
