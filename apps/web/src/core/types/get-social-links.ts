import type { SocialLinkItemModel } from '../models/social-link.model'

import type { withPagination } from '.'
import type { PaginationDto } from '../dtos/pagination.dto'

export namespace GetSocialLinks {
  export type ActionPayload = PaginationDto
  export type ActionResponse = withPagination<SocialLinkItemModel>
}
