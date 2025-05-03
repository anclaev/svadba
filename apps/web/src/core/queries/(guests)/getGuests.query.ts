import { queryOptions } from '@tanstack/react-query'

import { getGuests } from '@/core/actions/(guests)'

import type { PaginationDto } from '@/core/dtos/pagination.dto'

export const getGuestsQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['guests', dto],
    queryFn: () => getGuests(dto),
    staleTime: 5 * 1000,
  })
