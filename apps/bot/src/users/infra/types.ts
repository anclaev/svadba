import {
  Guest,
  GuestRole,
  Prisma,
  Side,
  User,
  UserRole,
  UserStatus,
} from '#prisma'

export type GuestAnswers = Prisma.JsonValue

export type UserModel = User & {
  guest?: Partial<Guest>
  guestId?: number
  telegramId?: number
  createdAt?: Date
}

export type SavedUserModel = User & {
  guest: Guest | null
  guestId?: number
}

export type CreateUserProps = {
  login: string
  password: string
  name: string
  side: Side
  isTelegramVerified?: boolean
  telegramId?: number
  status?: UserStatus
  role?: UserRole
  guestRole?: GuestRole
  answers?: Prisma.JsonValue
}
