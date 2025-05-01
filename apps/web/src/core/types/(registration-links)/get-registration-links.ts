import { RegistrationLinkItemModel } from '@/core/models/(registration-links)'

import { withPagination } from '..'
import { PaginationDto } from '../../dtos/pagination.dto'

export namespace GetRegistrationLinks {
  export type ActionPayload = PaginationDto
  export type ActionReposnse = withPagination<RegistrationLinkItemModel>
}
