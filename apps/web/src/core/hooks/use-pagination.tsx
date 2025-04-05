import { useCallback, useMemo, useState } from 'react'

import { PaginationItem, PaginationLink } from '@/shared/ui/pagination'

export type PaginationOptions = {
  page: number
  size: number
  count: number
}

export const initialPaginationOptions: PaginationOptions = {
  page: 1,
  count: 1,
  size: 10,
} as const

export function usePagination({
  page,
  count,
  size,
}: PaginationOptions = initialPaginationOptions) {
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [pageSize, setPageSize] = useState<number>(size)
  const [pagesCount, setPagesCount] = useState<number>(count)

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setCurrentPage(page - 1)
    }
  }, [page])

  const handleNextPage = useCallback(() => {
    if (page < pagesCount) {
      setCurrentPage(page + 1)
    }
  }, [pagesCount, page])

  const paginationItems = useMemo(() => {
    const items = []

    for (let i = 1; i <= pagesCount; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }, [pagesCount, page])

  return {
    pagesCount,
    setPagesCount,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    paginationItems,
    handlePreviousPage,
    handleNextPage,
  }
}
