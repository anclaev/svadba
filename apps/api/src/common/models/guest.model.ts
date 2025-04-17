import { Guest } from '#prisma'

export interface IGuestPrismaModel extends Guest {
  userId: string
}
