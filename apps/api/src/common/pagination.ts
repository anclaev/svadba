import { NotFoundException } from '@nestjs/common'

import { IPaginationParams, IPaginationResult } from '@repo/shared'

/**
 * Стандартный номер страницы по умолчанию
 * @constant {number} DEFAULT_PAGE_NUMBER
 * @default 1
 */
const DEFAULT_PAGE_NUMBER = 1

/**
 * Стандартный размер страницы по умолчанию
 * @constant {number} DEFAULT_PAGE_SIZE
 * @default 10
 */
const DEFAULT_PAGE_SIZE = 10

/**
 * Рассчитывает параметры пагинации для запроса
 * @function paginate
 * @param {IPaginationParams} query - Параметры пагинации (page и size)
 * @returns {{ skip: number; take: number }} Объект с параметрами для запроса:
 * - skip - количество элементов для пропуска
 * - take - количество элементов на странице
 *
 * @example
 * // Пример использования с Prisma
 * const { skip, take } = paginate({ page: 2, size: 20 });
 * const users = await prisma.user.findMany({ skip, take });
 *
 * @description
 * 1. Принимает параметры page и size (если не указаны - использует значения по умолчанию)
 * 2. Преобразует отрицательные значения в положительные
 * 3. Возвращает параметры для SQL-запроса (OFFSET и LIMIT)
 *
 * @see {@link IPaginationParams} Параметры пагинации
 */
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

/**
 * Формирует результат пагинации с мета-данными
 * @function paginateOutput
 * @template T - Тип элементов данных
 * @param {T[]} data - Массив данных текущей страницы
 * @param {number} total - Общее количество элементов
 * @param {IPaginationParams} query - Параметры пагинации (page и size)
 * @returns {IPaginationResult<T>} Результат с данными и мета-информацией
 * @throws {NotFoundException} Если запрошенная страница превышает максимальную
 *
 * @example
 * // Пример использования
 * const result = paginateOutput(users, 100, { page: 2, size: 10 });
 *
 * @description
 * 1. Рассчитывает мета-данные пагинации (последняя страница, следующая/предыдущая страницы)
 * 2. Проверяет валидность запрошенной страницы
 * 3. Возвращает стандартизированную структуру с данными и мета-информацией
 *
 * Структура возвращаемого объекта:
 * - {
 * -   data: T[],
 * -   meta: {
 * -     total: number,
 * -     lastPage: number,
 * -     currentPage: number,
 * -     totalPerPage: number,
 * -     prevPage: number | null,
 * -     nextPage: number | null
 * -   }
 * - }
 */
export const paginateOutput = <T>(
  data: T[],
  total: number,
  query: IPaginationParams
): IPaginationResult<T> => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
  const size = Math.abs(query.size) || DEFAULT_PAGE_SIZE

  const lastPage = Math.ceil(total / size)

  // Если данные пусты, возвращаем пустой массив
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

  // Если страница больше предыдущей страницы, выдать ошибку
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
