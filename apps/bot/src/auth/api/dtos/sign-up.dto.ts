import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const SignUpSchema = z.object({
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .min(4, { message: 'Логин не может быть менее 4 символов.' }),
  password: z
    .string({ message: 'Пароль должен быть строкой.' })
    .min(8, { message: 'Пароль не может быть менее 8 символов' }),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не может быть пустым.' }),
  side: z.enum(['GROOM', 'BRIDE'], { message: 'Некорректная сторона гостя.' }),
  role: z.enum(['GUEST', 'PARENT', 'CLOSE'], {
    message: 'Некорректная роль гостя.',
  }),
  anwsers: z.any().default({}),
})

export class SignUpDto extends createZodDto(SignUpSchema) {}
