import { Upload, User } from '#prisma'

export interface IUploadPrismaModel extends Upload {
  owner: User
  ownerId: string
}
