import { IUserModel, User } from '#/user/domain'

export * from './upload-query-params.interface'

export interface IUploadModel {
  id?: string
  url: string
  name: string
  filename: string
  ext: string
  mimetype: string | null
  owner: IUserModel
  ownerId: string
  createdAt?: Date
}

export interface IUploadProps {
  id?: string
  url: string
  name: string
  filename: string
  ext: string
  mimetype: string | null
  owner: User
  ownerId: string
  createdAt?: Date
}
