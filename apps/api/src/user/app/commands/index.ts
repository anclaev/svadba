import { CreateUserHandler } from './create-user'
import { DeleteUserHandler } from './delete-user'
import { UpdateUserHandler } from './update-user'

export * from './create-user'
export * from './delete-user'
export * from './update-user'

export const userCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
]
