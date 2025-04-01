import { queryOptions } from '@tanstack/react-query'

import { fetchSocialLinks } from '../actions/fetchSocialLinks'

import type { PaginationDto } from '../dtos/pagination.dto'

export const fetchSocialLinksQuery = (dto: PaginationDto) =>
  queryOptions({
    queryKey: ['socialLinks', dto],
    queryFn: () => fetchSocialLinks(dto),
    staleTime: 5 * 1000,
  })
