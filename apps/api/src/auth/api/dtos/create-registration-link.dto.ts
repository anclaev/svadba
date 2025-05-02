import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { USER_PASSWORD_MIN_LENGTH } from '#/common/constants'

import { RegistrationLinksByMetaSchema } from '../../app'

const CreateRegistrationLinkSchema = z.object({
  expiration: z.coerce
    .number({
      message: 'Срок действия ссылки должен быть числом (в секундах).',
    })
    .optional(),
  isActive: z.coerce
    .boolean({ message: 'Статус активности должен быть булевым.' })
    .default(true),
  meta: RegistrationLinksByMetaSchema.extend({
    initialPassword: z
      .string({ message: 'Пароль должен быть строкой.' })
      .min(USER_PASSWORD_MIN_LENGTH, {
        message: `Пароль не может быть меньше ${USER_PASSWORD_MIN_LENGTH} символов.`,
      })
      .optional(),
  }).default({}),
})

@ApiSchema({
  name: 'CreateRegistrationLinkDto',
  description: 'Данные для создания регистрационной ссылки',
})
export class CreateRegistrationLinkDto extends createZodDto(
  CreateRegistrationLinkSchema
) {}
