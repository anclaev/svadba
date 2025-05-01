import { queryOptions } from '@tanstack/react-query'

import { getRegistrationLinks } from '@/core/actions/(registration-links)'

import type { PaginationDto } from '@/core/dtos/pagination.dto'

export const getRegistrationLinksQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['registrationLinks', dto],
    queryFn: () => getRegistrationLinks(dto),
    staleTime: 5 * 1000,
  })
