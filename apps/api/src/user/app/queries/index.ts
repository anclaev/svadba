import { UserByIdHandler } from './user-by-id'
import { UserByLoginHandler } from './user-by-login'

export * from './user-by-id'
export * from './user-by-login'

export const userQueryHandlers = [UserByIdHandler, UserByLoginHandler]
