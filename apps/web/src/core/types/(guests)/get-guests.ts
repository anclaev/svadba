import { PaginationDto } from '@/core/dtos/pagination.dto'
import { UserModel } from '@/core/models'
import { withPagination } from '..'

export namespace GetGuests {
  export type ActionPayload = PaginationDto
  export type ActionResponse = withPagination<UserModel>
}
