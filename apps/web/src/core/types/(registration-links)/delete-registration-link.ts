import type { ApiError, AppError } from '@/core/types'

export namespace DeleteRegistrationLink {
  export type ApiResponse = boolean | ApiError

  export type ActionPayload = {
    id: string
  }

  export type ActionResponse = {
    status?: boolean
    error?: AppError
  }
}
