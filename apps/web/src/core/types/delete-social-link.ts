import type { ApiError, AppError } from '.'

export namespace DeleteSocialLink {
  export type ApiResponse = boolean | ApiError

  export type ActionPayload = {
    id: string
  }

  export type ActionResponse = {
    status?: boolean
    error?: AppError
  }
}
