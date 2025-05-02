import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * Схема валидации параметров запроса с алиасом
 * @constant {z.ZodObject} AliasQueryParamsSchema
 * @description Определяет правила валидации для параметра alias:
 * - Должен быть строкой
 * - Не может быть пустым
 *
 * @example
 * // Пример использования схемы
 * const params = AliasQueryParamsSchema.parse({ alias: 'example' });
 */
const AliasQueryParamsSchema = z.object({
  /**
   * Алиас (уникальный идентификатор)
   * @type {z.ZodString}
   * @required
   * @description Уникальный человекочитаемый идентификатор
   * @example
   * { alias: 'example-alias' }
   */
  alias: z
    .string({ message: 'Алиас должен быть строкой.' })
    .nonempty({ message: 'Алиас не должен быть пустым.' }),
})

/**
 * DTO для параметров запроса с алиасом
 * @class AliasQueryParamsDto
 * @extends createZodDto(AliasQueryParamsSchema)
 * @description Data Transfer Object для работы с алиасом в запросах:
 * - Автоматическая валидация данных
 * - Преобразование типов
 * - Интеграция с OpenAPI/Swagger
 *
 * @property {string} alias - Уникальный алиас (обязательное поле)
 *
 * @example
 * // Использование в контроллере
 * @Get(':alias')
 * async getByAlias(@Query() query: AliasQueryParamsDto) {
 *   return this.service.findByAlias(query.alias);
 * }
 *
 * @see AliasQueryParamsSchema Базовая схема валидации
 * @see createZodDto Функция создания DTO из Zod-схемы
 */
@ApiSchema({
  name: 'AliasQueryParamsDto',
  description: 'Параметры запроса с алиасом',
})
export class AliasQueryParamsDto extends createZodDto(AliasQueryParamsSchema) {}
