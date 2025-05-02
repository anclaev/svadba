import { CreateGuestHandler } from './commands'
import { GuestByIdHandler, GuestByUserIdHandler } from './queries'

export * from './commands'
export * from './queries'

export const guestCommandHandlers = [CreateGuestHandler]
export const guestQueryHandlers = [GuestByUserIdHandler, GuestByIdHandler]
