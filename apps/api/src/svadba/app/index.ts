import { CreateGuestHandler, RegisterGuestHandler } from './commands'
import {
  GuestByIdHandler,
  GuestByUserIdHandler,
  GuestsHandler,
} from './queries'

export * from './commands'
export * from './queries'

export const guestCommandHandlers = [CreateGuestHandler, RegisterGuestHandler]
export const guestQueryHandlers = [
  GuestByUserIdHandler,
  GuestByIdHandler,
  GuestsHandler,
]
