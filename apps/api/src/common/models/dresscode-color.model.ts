import { DresscodeColor, User } from '#prisma'

export interface IDresscodeColorPrismaModel extends DresscodeColor {
  owner: User
  ownerId: string
}
