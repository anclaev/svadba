import { NotFoundException } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_SIZE = 10

export const paginate = (
  query: IPaginationParams
): { skip: number; take: number } => {
  const size = Math.abs(query.size) || DEFAULT_PAGE_SIZE
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
  return {
    skip: size * (page - 1),
    take: size,
  }
}

export const paginateOutput = <T>(
  data: T[],
  total: number,
  query: IPaginationParams
  //   page: number,
  //   limit: number,
): IPaginationResult<T> => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
  const size = Math.abs(query.size) || DEFAULT_PAGE_SIZE

  const lastPage = Math.ceil(total / size)

  // if data is empty, return empty array
  if (!data.length) {
    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        totalPerPage: size,
        prevPage: null,
        nextPage: null,
      },
    } as IPaginationResult<T>
  }

  // if page is greater than last page, throw an error
  if (page > lastPage) {
    throw new NotFoundException(
      `Страница ${page} не найдена. Крайняя страница: ${lastPage}`
    )
  }

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      totalPerPage: size,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < lastPage ? page + 1 : null,
    },
  } as IPaginationResult<T>
}
