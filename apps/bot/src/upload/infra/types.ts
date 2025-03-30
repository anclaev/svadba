import { Upload, User } from '#prisma'

export type UploadModel = Upload & {
  owner?: Partial<User>
  ownerId?: number
  createdAt?: Date
}

export type SavedUploadModel = Upload & {
  owner: User
  ownerId: number
}

export type CreateUploadProps = {
  id?: number
  url: string
  filename: string
  ownerId: string
  name?: string
  ext?: string
  mimetype?: string
  createdAt?: Date
}
