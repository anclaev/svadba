import type { SocialLinkItemModel } from '@/core/models/social-link.model'

import type { PaginationDto } from '@/core/dtos/pagination.dto'
import type { withPagination } from '@/core/types'

export namespace GetSocialLinks {
  export type ActionPayload = PaginationDto
  export type ActionResponse = withPagination<SocialLinkItemModel>
}
