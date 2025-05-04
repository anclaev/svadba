import { queryOptions } from '@tanstack/react-query'

import { getPendingGuests } from '@/core/actions/(guests)'

import type { PaginationDto } from '@/core/dtos/pagination.dto'

export const getPendingGuestsQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['pendingGuests', dto],
    queryFn: () => getPendingGuests(dto),
    staleTime: 5 * 1000,
  })
