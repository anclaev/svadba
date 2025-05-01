import type { RegistrationLinkModel } from '@/core/models/(registration-links)'
import type { UpdateRegistrationLinkFormValues } from '@/core/schemes/(registration-links)'
import type { ApiError, AppError } from '@/core/types'

export namespace UpdateRegistrationLink {
  export type ApiResponse = RegistrationLinkModel | ApiError
  export type ActionResponse = {
    link?: RegistrationLinkModel
    error?: AppError
  }
  export type ActionPayload = {
    id: string
    data: UpdateRegistrationLinkFormValues
  }
}
