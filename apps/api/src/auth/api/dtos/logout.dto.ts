import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * @description rtid - идентификатор рефреш токена пользователя
 */
const LogoutQuery = z.object({
  rtid: z.string({ message: 'Некорректный rtid.' }).optional(),
})

@ApiSchema({
  name: 'LogoutDto',
  description: 'Параметры выхода из системы',
})
export class LogoutDto extends createZodDto(LogoutQuery) {}
