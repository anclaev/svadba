import type { AppError } from '.'
import type { UserModel } from '../models/user.model'

export namespace GetProfile {
  export type ActionResponse = {
    user?: UserModel
    error?: AppError
  } | null

  export type ApiResponse = UserModel
}
