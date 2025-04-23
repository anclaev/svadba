import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * Схема валидации параметров пагинации запросов
 * @constant {z.ZodObject} QueryPaginationSchema
 * @description Определяет структуру и правила валидации для параметров пагинации:
 * - Номер страницы (page)
 * - Количество элементов на странице (size)
 *
 * Оба параметра являются опциональными и преобразуются в число (coerce).
 *
 * @example
 * // Пример использования в контроллере
 * async getUsers(@Query() query: z.infer<typeof QueryPaginationSchema>) {
 *   const validated = QueryPaginationSchema.parse(query);
 *   // validated.page - номер страницы (number | undefined)
 *   // validated.size - размер страницы (number | undefined)
 * }
 *
 * @see https://zod.dev/ Документация Zod
 */
export const QueryPaginationSchema = z.object({
  /**
   * Номер страницы (начиная с 1)
   * @type {z.ZodNumber}
   * @optional
   * @description Преобразует строковый параметр в число.
   * Если не указан - используются значения по умолчанию.
   * @example
   * // Пример значения
   * { page: 2 } // Вторая страница
   */
  page: z.coerce
    .number({ message: 'Некорректная страница элементов.' })
    .optional(),
  /**
   * Количество элементов на странице
   * @type {z.ZodNumber}
   * @optional
   * @description Преобразует строковый параметр в число.
   * Если не указан - используются значения по умолчанию.
   * @example
   * // Пример значения
   * { size: 50 } // 50 элементов на странице
   */
  size: z.coerce
    .number({ message: 'Некорректное количество элементов.' })
    .optional(),
})

/**
 * DTO (Data Transfer Object) для параметров пагинации запросов
 * @class QueryPaginationDto
 * @extends createZodDto(QueryPaginationSchema)
 * @description
 * Класс-обертка над Zod-схемой QueryPaginationSchema, предоставляющий:
 * - Валидацию входных данных
 * - Преобразование типов (строки в числа)
 * - Готовый к использованию в NestJS DTO
 *
 * @property {number} [page] - Номер страницы (опционально)
 * @property {number} [size] - Количество элементов на странице (опционально)
 *
 * @example
 * // Использование в контроллере
 * @Get()
 * async getUsers(@Query() query: QueryPaginationDto) {
 *   // query автоматически валидируется
 *   const { page = 1, size = 10 } = query;
 *   return this.service.findAll(page, size);
 * }
 *
 * @see QueryPaginationSchema Базовая Zod-схема валидации
 * @see createZodDto Функция создания DTO из Zod-схемы
 */
@ApiSchema({
  name: 'QueryPaginationDto',
  description: 'Параметры пагинации',
})
export class QueryPaginationDto extends createZodDto(QueryPaginationSchema) {}
