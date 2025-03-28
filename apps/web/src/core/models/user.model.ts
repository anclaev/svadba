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

export interface UserModel {
  id: string
  telegramId?: string
  status: UserStatus
  role: UserRole
  login: string
  name: string
  isTelegramVerified: boolean
  createdAt: string
  guest: GuestModel
}
