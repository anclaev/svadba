import { UserRole, UserStatus } from '#prisma'

export type CreateUserInput = {
  telegramId?: string
  login: string
  password: string
  name: string
  status?: UserStatus
  role?: UserRole
  isTelegramVerified?: boolean
}
