import { IUserModel, User } from '#/user/domain'

export * from './social-link-query-params.interface'

export interface ISocialLinkModel {
  id: string
  alias: string
  title: string
  href: string
  icon: string | null
  creator: IUserModel
  creatorId: string
  updatedAt?: Date
  createdAt?: Date
}

export interface ISocialLinkProps {
  id: string
  alias: string
  title: string
  href: string
  icon: string | null
  creator?: User
  creatorId: string
  updatedAt?: Date
  createdAt?: Date
}
