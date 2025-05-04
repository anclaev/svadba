import { Guest, User } from '#prisma'

export interface IUserPrismaModel extends User {
  guest?: Guest
  guestId: string
}
