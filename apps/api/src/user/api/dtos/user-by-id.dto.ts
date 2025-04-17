import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserByIdSchema = z.object({
  id: z.string().uuid({ message: 'Идентификатор должен быть в формате UUID' }),
})

@ApiSchema({
  name: 'UserByIdDto',
  description: 'Данные для получения пользователя по идентификатору',
})
export class UserByIdDto extends createZodDto(UserByIdSchema) {}
