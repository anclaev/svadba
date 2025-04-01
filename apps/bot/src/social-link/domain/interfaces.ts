import { User } from '#/user/domain'
import { IUserRaw } from '#/user/domain/interfaces'

export interface ISocialLinkRaw {
  id?: string
  alias: string
  title: string
  href: string
  icon: string | null
  creator?: IUserRaw
  creatorId: string
  createdAt?: Date
}

export interface ISocialLinkProps {
  id?: string
  alias: string
  title: string
  href: string
  icon: string | null
  creator?: User
  creatorId: string
  createdAt?: Date
}
