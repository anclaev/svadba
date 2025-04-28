import { GuestRole, GuestSide } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import {
  USER_LOGIN_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '#/common/constants'

const SignUpSchema = z.object({
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .min(USER_LOGIN_MIN_LENGTH, {
      message: `Логин не может быть менее ${USER_LOGIN_MIN_LENGTH} символов.`,
    }),
  password: z
    .string({ message: 'Пароль должен быть строкой.' })
    .min(USER_PASSWORD_MIN_LENGTH, {
      message: `Пароль не может быть менее ${USER_PASSWORD_MIN_LENGTH} символов`,
    }),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не может быть пустым.' }),
  side: z.nativeEnum(GuestSide, { message: 'Некорректная сторона гостя.' }),
  role: z.nativeEnum(GuestRole, {
    message: 'Некорректная роль гостя.',
  }),
  // answers: z.any().default({}),
})

@ApiSchema({
  name: 'SignUpDto',
  description: 'Данные для регистрации пользователя',
})
export class SignUpDto extends createZodDto(SignUpSchema) {}
