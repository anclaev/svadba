import { UserRole, UserStatus } from '#prisma'

export type UpdateUserInput = {
  telegramId?: number
  status?: UserStatus
  role?: UserRole
  login?: string
  password?: string
  name?: string
  guestId?: string
}
