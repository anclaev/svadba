import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserByLoginSchema = z.object({
  login: z.string().nonempty('Логин пользователя не может быть пустым'),
})

@ApiSchema({
  name: 'UserByLoginDto',
  description: 'Данные для получения пользователя по логину',
})
export class UserByLoginDto extends createZodDto(UserByLoginSchema) {}
