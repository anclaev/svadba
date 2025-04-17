import type { AppError } from '.'
import type { UserModel } from '../models/user.model'

export namespace RefreshUser {
  export type ApiResponse = {
    user: UserModel
    access_token: string
    refresh_token: string
    refresh_token_id: string
  }

  export type ActionResponse = {
    user?: UserModel
    access_token?: string
    refresh_token?: string
    error?: AppError
  } | null
}
