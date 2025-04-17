import type { AppError } from '.'
import type { GuestSide, UserModel } from '../models/user.model'

export namespace RegisterUser {
  export type ApiResponse = {
    user: UserModel
    access_token: string
    refresh_token: string
    refresh_token_id: string
  }

  export type ActionPayload = {
    login: string
    password: string
    name: string
    side: GuestSide
    answers?: JSON
  }

  export type ActionResponse = {
    user?: UserModel
    error?: AppError
  }
}
