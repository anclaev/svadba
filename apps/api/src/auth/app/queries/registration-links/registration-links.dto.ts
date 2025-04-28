import { z } from 'zod'

import { GuestRole, GuestSide, RegistrationLinkStatus, UserRole } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'

import { USER_LOGIN_MIN_LENGTH } from '#/common/constants'
import { QueryPaginationSchema } from '#/common/dtos'

const RegistrationLinksSchema = QueryPaginationSchema.extend({
  status: z.nativeEnum(RegistrationLinkStatus, {
    message: 'Некорректный статус.',
  }),
  ownerId: z
    .string({ message: 'ID создателя должно быть строкой.' })
    .uuid({ message: 'ID создателя должно быть uuid.' }),
  isActive: z.coerce.boolean({
    message: 'Статус активности должен быть булевым.',
  }),
  'meta.login': z
    .string({ message: 'Логин должен быть строкой.' })
    .min(USER_LOGIN_MIN_LENGTH, {
      message: `Логин не может быть меньше ${USER_LOGIN_MIN_LENGTH} символов.`,
    }),
  'meta.name': z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Логин не должен быть пустым.' }),
  'meta.role': z.nativeEnum(UserRole, {
    message: 'Некорректная роль пользователя.',
  }),
  'meta.guestRole': z.nativeEnum(GuestRole, {
    message: 'Некорректная роль гостя.',
  }),
  'meta.guestSide': z.nativeEnum(GuestSide, {
    message: 'Некорректная сторона гостя.',
  }),
}).partial()

@ApiSchema({
  name: 'RegistrationLinksDto',
  description: 'Данные для получения списка регистрационных ссылок',
})
export class RegistrationLinksDto extends createZodDto(
  RegistrationLinksSchema
) {}
