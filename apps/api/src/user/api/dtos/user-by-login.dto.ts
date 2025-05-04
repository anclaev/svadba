import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * Схема валидации параметров запроса пользователя с login
 * @constant {z.ZodObject} UserByLoginSchema
 * @description Определяет правила валидации для параметра login:
 * - Должен быть строкой
 * - Не может быть пустым
 *
 * @example
 * // Пример использования схемы
 * const params = UserByLoginSchema.parse({ login: "user" });
 */
export const UserByLoginSchema = z.object({
  /**
   * Логин
   * @type {z.ZodString}
   * @required
   * @description Должен быть непустой строкой
   * @example
   * { login: 'user' }
   */
  login: z.string().nonempty('Логин пользователя не может быть пустым'),
})

/**
 * DTO для параметров запроса пользователя с ID
 * @class UserByLoginDto
 * @extends createZodDto(UserByLoginSchema)
 * @description Data Transfer Object для работы с логином в запросах:
 * - Автоматическая валидация логина
 * - Преобразование типов
 * - Интеграция с OpenAPI/Swagger
 *
 * @property {string} login - Непустая строка (обязательное поле)
 *
 * @example
 * // Использование в контроллере
 * @Get(':id')
 * async getByLogin(@Query() query: UserByLoginDto) {
 *   return this.service.findById(query.login);
 * }
 *
 * @see UserByLoginSchema Базовая схема валидации
 * @see createZodDto Функция создания DTO из Zod-схемы
 */
@ApiSchema({
  name: 'UserByLoginDto',
  description: 'Данные для получения пользователя по логину',
})
export class UserByLoginDto extends createZodDto(UserByLoginSchema) {}
