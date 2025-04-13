import { GuestRole, Side, UserRole, UserStatus } from '#prisma'

export interface IUserQueryParams {
  status?: UserStatus
  role?: UserRole
  guestRole?: GuestRole
  guestSide?: Side
  login?: string
  name?: string
  isTelegramVerified?: boolean
}
