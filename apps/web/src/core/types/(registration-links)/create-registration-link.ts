import type { RegistrationLinkModel } from '@/core/models/(registration-links)'
import type { CreateRegistrationLinkFormValues } from '@/core/schemes/(registration-links)'
import type { ApiError, AppError } from '@/core/types'

export namespace CreateRegistrationLink {
  export type ApiResponse = RegistrationLinkModel | ApiError
  export type ActionPayload = CreateRegistrationLinkFormValues
  export type ActionResponse = {
    link?: RegistrationLinkModel
    error?: AppError
  }
}
