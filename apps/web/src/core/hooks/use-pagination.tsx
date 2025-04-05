'use client'

import { useCallback, useState } from 'react'

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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage])

  const handleNextPage = useCallback(() => {
    console.log(currentPage)
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1)
    }
  }, [pagesCount, currentPage])

  return {
    pagesCount,
    setPagesCount,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    handlePreviousPage,
    handleNextPage,
  }
}
