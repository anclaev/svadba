import type { ApiError, AppError } from '.'
import type { SocialLinkModel } from '../models/social-link.model'
import type { UpdateSocialLinkFormValues } from '../schemes/update-social-link-form-schema'

export namespace UpdateSocialLink {
  export type ApiResponse = SocialLinkModel | ApiError
  export type ActionResponse = {
    link?: SocialLinkModel
    error?: AppError
  }
  export type ActionPayload = {
    id: string
    data: UpdateSocialLinkFormValues
  }
}
