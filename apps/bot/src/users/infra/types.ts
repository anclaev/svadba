import {
  Guest,
  GuestRole,
  Prisma,
  Side,
  User,
  UserRole,
  UserStatus,
} from "#prisma"

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
  id?: number
  login: string
  password: string
  name: string
  side: Side
  isTelegramVerified?: boolean
  telegramId?: number
  status?: UserStatus
  role?: UserRole
  guestId?: number
  guestRole?: GuestRole
  guestCreatedAt?: Date
  answers?: Prisma.JsonValue
  credentials?: Credentials[]
  createdAt?: Date
}

export type Credentials = {
  version: number
  lastPassword: string | null
  passwordUpdatedAt: Date | null
}
