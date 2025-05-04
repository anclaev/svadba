import { IUserModel } from '#/user/domain'
import { Guest } from '#prisma'

export interface IGuestPrismaModel extends Guest {
  userId: string
  user?: IUserModel
}
