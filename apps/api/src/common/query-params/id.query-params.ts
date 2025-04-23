import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * Схема валидации параметров запроса с ID
 * @constant {z.ZodObject} IdQueryParamsSchema
 * @description Определяет правила валидации для параметра ID:
 * - Должен быть строкой
 * - Должен соответствовать формату UUID
 * - Не может быть пустым
 *
 * @example
 * // Пример использования схемы
 * const params = IdQueryParamsSchema.parse({ id: '550e8400-e29b-41d4-a716-446655440000' });
 */
const IdQueryParamsSchema = z.object({
  /**
   * Уникальный идентификатор (UUID)
   * @type {z.ZodString}
   * @required
   * @format uuid
   * @description Должен быть валидным UUID v4
   * @example
   * { id: '550e8400-e29b-41d4-a716-446655440000' }
   */
  id: z
    .string({ message: 'ID должен быть строкой.' })
    .uuid({ message: 'ID должен быть uuid.' })
    .nonempty({ message: 'ID не должен быть пустым.' }),
})

/**
 * DTO для параметров запроса с ID
 * @class IdQueryParamsDto
 * @extends createZodDto(IdQueryParamsSchema)
 * @description Data Transfer Object для работы с ID в запросах:
 * - Автоматическая валидация UUID
 * - Преобразование типов
 * - Интеграция с OpenAPI/Swagger
 *
 * @property {string} id - Уникальный идентификатор в формате UUID (обязательное поле)
 *
 * @example
 * // Использование в контроллере
 * @Get(':id')
 * async getById(@Query() query: IdQueryParamsDto) {
 *   return this.service.findById(query.id);
 * }
 *
 * @see IdQueryParamsSchema Базовая схема валидации
 * @see createZodDto Функция создания DTO из Zod-схемы
 */
@ApiSchema({
  name: 'IdQueryParamsDto',
  description: 'Параметры запроса с ID',
})
export class IdQueryParamsDto extends createZodDto(IdQueryParamsSchema) {}
