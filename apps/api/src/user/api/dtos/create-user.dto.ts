import { UserRole, UserStatus } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import {
  USER_LOGIN_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '#/common/constants'

const CreateUserSchema = z.object({
  telegramId: z
    .number({ message: 'telegramId должен быть числом.' })
    .optional(),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .min(USER_LOGIN_MIN_LENGTH, {
      message: `Логин не может быть меньше ${USER_LOGIN_MIN_LENGTH} символов.`,
    }),
  password: z
    .string({ message: 'Пароль должен быть строкой.' })
    .min(USER_PASSWORD_MIN_LENGTH, {
      message: `Пароль не может быть меньше ${USER_PASSWORD_MIN_LENGTH} символов.`,
    }),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не должно быть пустым.' }),
  status: z
    .nativeEnum(UserStatus, {
      message: 'Некорректный статус пользователя.',
    })
    .optional(),
  role: z
    .nativeEnum(UserRole, { message: 'Некорректная роль пользователя.' })
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
