export type UserRole = 'PUBLIC' | 'ADMIN'
export type UserStatus = 'CREATED' | 'ACCEPTED' | 'BLOCKED'
export type GuestRole = 'GUEST' | 'PARENT' | 'CLOSE' | 'GROOM' | 'BRIDE'
export type GuestSide = 'GROOM' | 'BRIDE'

export interface GuestModel {
  id: string
  side: GuestSide
  role: GuestRole
  answers: JSON
  createdAt: string
}

export interface AuthorizedUser {
  id: string
  telegramId: string | null
  status: UserStatus
  role: UserRole
  login: string
  name: string
}

export interface UserModel extends AuthorizedUser {
  isTelegramVerified: boolean
  createdAt: string
  guest: GuestModel
}
