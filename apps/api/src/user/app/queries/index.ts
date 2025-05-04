import { UserByIdHandler } from './user-by-id'
import { UserByLoginHandler } from './user-by-login'
import { UsersHandler } from './users'

export * from './user-by-id'
export * from './user-by-login'
export * from './users'

export const userQueryHandlers = [
  UserByIdHandler,
  UserByLoginHandler,
  UsersHandler,
]
