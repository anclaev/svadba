import { UserRole, UserStatus } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { QueryPaginationSchema } from '#/common/dtos'

export const UsersSchema = QueryPaginationSchema.extend({
  status: z.nativeEnum(UserStatus, { message: 'Некорректный статус.' }),
  role: z.nativeEnum(UserRole, { message: 'Некорректная роль.' }),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .nonempty({ message: 'Логин не должен быть пустым.' }),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не должно быть пустым.' }),
  isTelegramVerified: z.boolean({
    message: 'Верификация Telegram должна быть булевым.',
  }),
}).partial()

@ApiSchema({
  name: 'UsersDto',
  description: 'Данные для получения списка пользователей',
})
export class UsersDto extends createZodDto(UsersSchema) {}
