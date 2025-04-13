import { GuestRole, Side, UserRole, UserStatus } from '#prisma'
import { JsonObject } from '@prisma/client/runtime/library'

export type CreateUserInput = {
  telegramId?: string
  login: string
  password: string
  name: string
  side: Side
  status?: UserStatus
  role?: UserRole
  guestRole?: GuestRole
  guestAnswers?: JsonObject
  isTelegramVerified?: boolean
}
