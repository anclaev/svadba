import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const LoginSchema = z.object({
  login: z
    .string({ message: 'Некорректный логин.' })
    .nonempty({ message: 'Логин не может быть пустым.' }),
  password: z
    .string({ message: 'Некорректный пароль.' })
    .nonempty({ message: 'Пароль не может быть пустым.' }),
})

@ApiSchema({
  name: 'LoginDto',
  description: 'Данные для авторизации пользователя',
})
export class LoginDto extends createZodDto(LoginSchema) {}
