import { UserRole, UserStatus } from '#prisma'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import {
  USER_LOGIN_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '#/common/constants'

const UpdateUserSchema = z.object({
  telegramId: z.coerce
    .number({ message: 'telegramId должен быть числом.' })
    .optional(),
  status: z
    .nativeEnum(UserStatus, { message: 'Некорректный статус.' })
    .optional(),
  role: z.nativeEnum(UserRole, { message: 'Некорректная роль.' }).optional(),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .min(USER_LOGIN_MIN_LENGTH, {
      message: `Логин не может быть меньше ${USER_LOGIN_MIN_LENGTH} символов.`,
    })
    .optional(),
  password: z
    .string({ message: 'Пароль должен быть строкой.' })
    .min(USER_PASSWORD_MIN_LENGTH, {
      message: `Пароль не может быть меньше ${USER_PASSWORD_MIN_LENGTH} символов.`,
    })
    .optional(),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не должно быть пустым.' })
    .optional(),
  guestId: z
    .string({ message: 'ID гостя должно быть строкой.' })
    .uuid('ID гостя должно быть uuid.')
    .optional(),
})

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
