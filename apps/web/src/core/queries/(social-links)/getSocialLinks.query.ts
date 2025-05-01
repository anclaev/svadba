import { queryOptions } from '@tanstack/react-query'

import { getSocialLinks } from '@/core/actions/(social-links)'

import type { PaginationDto } from '@/core/dtos/pagination.dto'

export const getSocialLinksQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['socialLinks', dto],
    queryFn: () => getSocialLinks(dto),
    staleTime: 5 * 1000,
  })
