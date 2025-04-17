import type { ApiError, AppError } from '.'
import type { SocialLinkModel } from '../models/social-link.model'
import type { CreateSocialLinkFormValues } from '../schemes/create-social-link-form-schema'

export namespace CreateSocialLink {
  export type ApiResponse = SocialLinkModel | ApiError
  export type ActionPayload = CreateSocialLinkFormValues
  export type ActionResponse = {
    link?: SocialLinkModel
    error?: AppError
  }
}
