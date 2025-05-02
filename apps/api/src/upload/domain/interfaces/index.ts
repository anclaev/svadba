import { IUserModel, User } from '#/user/domain'

export * from './upload-query-params.interface'

export interface IUploadModel {
  id?: string
  url: string
  name: string
  filename: string
  ext: string
  mimetype: string | null
  size: number | null
  owner: IUserModel
  ownerId: string
  updatedAt?: Date
  createdAt?: Date
}

export interface IUploadProps {
  id?: string
  url: string
  name: string
  filename: string
  ext: string
  mimetype: string | null
  size: number | null
  owner: User
  ownerId: string
  updatedAt?: Date
  createdAt?: Date
}
