import { GuestRole, GuestSide } from '#prisma'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { UsersSchema } from '#/user/app'
import { ApiSchema } from '@nestjs/swagger'

const GuestsSchema = UsersSchema.extend({
  side: z.nativeEnum(GuestSide),
  guestRole: z.nativeEnum(GuestRole),
}).partial()

@ApiSchema({
  name: 'GuestsDto',
  description: 'Данные для получения списка гостей',
})
export class GuestsDto extends createZodDto(GuestsSchema) {}
