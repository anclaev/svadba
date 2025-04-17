import { queryOptions } from '@tanstack/react-query'

import { getSocialLinks } from '../actions/getSocialLinks'

import type { PaginationDto } from '../dtos/pagination.dto'

export const getSocialLinksQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['socialLinks', dto],
    queryFn: () => getSocialLinks(dto),
    staleTime: 5 * 1000,
  })
