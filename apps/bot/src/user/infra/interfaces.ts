import { Guest, User } from '#prisma'

export type GuestModel = Omit<Guest, 'id' | 'userId' | 'createdAt'> & {
  id?: string
  userId?: string
  createdAt?: Date
}

export type UserModel = Omit<User, 'id' | 'guestId' | 'createdAt'> & {
  id?: string
  guestId?: string
  createdAt?: Date
  guest: GuestModel
}
