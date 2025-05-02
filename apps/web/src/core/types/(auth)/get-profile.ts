import type { UserModel } from '@/core/models/user.model'
import type { AppError } from '@/core/types'

export namespace GetProfile {
  export type ActionResponse = {
    user?: UserModel
    error?: AppError
  } | null

  export type ApiResponse = UserModel
}
