import { PaginationDto } from '@/core/dtos/pagination.dto'
import { GuestModel } from '@/core/models'
import { withPagination } from '..'

export namespace GetPendingGuests {
  export type ActionPayload = PaginationDto
  export type ActionResponse = withPagination<GuestModel>
}
