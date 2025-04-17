import type { AppError } from '.'
import type { UserModel } from '../models/user.model'

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
