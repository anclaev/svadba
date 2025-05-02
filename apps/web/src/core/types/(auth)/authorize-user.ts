import type { UserModel } from '@/core/models/user.model'
import type { AppError } from '@/core/types'

export namespace AuthorizeUser {
  export type ApiResponse = {
    user: UserModel
    access_token: string
    refresh_token: string
    refresh_token_id: string
  }

  export type ActionPayload = {
    login: string
    password: string
  }

  export type ActionResponse = {
    user?: UserModel
    error?: AppError
  }
}
