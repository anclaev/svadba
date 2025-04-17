import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const CreateUserSchema = z.object({
  telegramId: z
    .number({ message: 'telegramId должен быть числом.' })
    .optional(),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .nonempty({ message: 'Логин не должен быть пустым.' }),
  password: z
    .string({ message: 'Пароль должен быть строкой.' })
    .min(8, { message: 'Пароль не может быть меньше 8 символов.' }),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не должно быть пустым.' }),
  status: z
    .enum(['CREATED', 'ACCEPTED', 'BLOCKED'], {
      message: 'Некорректный статус пользователя.',
    })
    .optional(),
  role: z
    .enum(['PUBLIC', 'ADMIN'], { message: 'Некорректная роль пользователя.' })
    .optional(),
  isTelegramVerified: z
    .boolean({ message: 'Некорректный статус верификации Telegram.' })
    .optional(),
})

@ApiSchema({
  name: 'CreateUserDto',
  description: 'Данные для создания пользователя',
})
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
