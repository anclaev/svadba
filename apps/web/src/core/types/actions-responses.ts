import { UserModel } from '@/core/models/user.model'

import type { AppError } from '.'

export type AuthorizeUserActionResponse = {
  user?: UserModel
  error?: AppError
}

export type RefreshUserActionResponse = {
  user?: UserModel
  access_token?: string
  refresh_token?: string
  error?: AppError
} | null

export type FetchProfileActionResponse = {
  user?: UserModel
  error?: AppError
} | null
