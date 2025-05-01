import type { SocialLinkModel } from '@/core/models/social-link.model'
import type { CreateSocialLinkFormValues } from '@/core/schemes/(social-links)'
import type { ApiError, AppError } from '@/core/types'

export namespace CreateSocialLink {
  export type ApiResponse = SocialLinkModel | ApiError
  export type ActionPayload = CreateSocialLinkFormValues
  export type ActionResponse = {
    link?: SocialLinkModel
    error?: AppError
  }
}
