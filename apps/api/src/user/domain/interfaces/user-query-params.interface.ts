import { UserRole, UserStatus } from '#prisma'

export interface IUserQueryParams {
  status?: UserStatus
  role?: UserRole
  login?: string
  name?: string
  isTelegramVerified?: boolean
}
