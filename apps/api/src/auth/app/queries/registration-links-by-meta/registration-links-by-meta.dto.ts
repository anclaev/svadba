import { GuestRole, GuestSide, UserRole } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { USER_LOGIN_MIN_LENGTH } from '#/common/constants'

export const RegistrationLinksByMetaSchema = z
  .object({
    login: z
      .string({ message: 'Логин должен быть строкой.' })
      .min(USER_LOGIN_MIN_LENGTH, {
        message: `Логин не может быть меньше ${USER_LOGIN_MIN_LENGTH} символов.`,
      }),
    name: z
      .string({ message: 'Имя должно быть строкой.' })
      .nonempty({ message: 'Логин не должен быть пустым.' }),
    role: z.nativeEnum(UserRole, {
      message: 'Некорректная роль пользователя.',
    }),
    guestRole: z.nativeEnum(GuestRole, { message: 'Некорректная роль гостя.' }),
    guestSide: z.nativeEnum(GuestSide, {
      message: 'Некорректная сторона гостя.',
    }),
  })
  .partial()

@ApiSchema({
  name: 'RegistrationLinksByMetaDto',
  description:
    'Данные для получения списка регистрационных ссылок по мета-полю',
})
export class RegistrationLinksByMetaDto extends createZodDto(
  RegistrationLinksByMetaSchema
) {}
