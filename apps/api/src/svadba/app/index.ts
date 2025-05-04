import { CreateGuestHandler, RegisterGuestHandler } from './commands'
import { GuestByIdHandler, GuestByUserIdHandler } from './queries'

export * from './commands'
export * from './queries'

export const guestCommandHandlers = [CreateGuestHandler, RegisterGuestHandler]
export const guestQueryHandlers = [GuestByUserIdHandler, GuestByIdHandler]
