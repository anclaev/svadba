import type { SocialLinkModel } from '@/core/models/social-link.model'
import type { UpdateSocialLinkFormValues } from '@/core/schemes/(social-links)'
import type { ApiError, AppError } from '@/core/types'

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
