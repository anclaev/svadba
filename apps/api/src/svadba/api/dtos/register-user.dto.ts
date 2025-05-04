import { GuestRole, GuestSide } from '#prisma'
import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { CreateUserSchema } from '#/user/api'

const RegisterGuestSchema = CreateUserSchema.extend({
  guestRole: z
    .nativeEnum(GuestRole, { message: 'Некорректная роль гостя.' })
    .optional(),
  side: z.nativeEnum(GuestSide, { message: 'Некорректная сторона гостя.' }),
  answers: z.any(),
})

@ApiSchema({
  name: 'RegisterGuestDto',
  description: 'Данные для регистрации гостя',
})
export class RegisterGuestDto extends createZodDto(RegisterGuestSchema) {}
