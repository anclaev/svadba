import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { USER_PASSWORD_MIN_LENGTH } from '#/common/constants'

import { RegistrationLinksByMetaSchema } from '../../app'

const UpdateRegistrationLinkSchema = z
  .object({
    expiresAt: z.coerce.date({
      message: 'Некорректная дата истечения срока действия.',
    }),
    isActive: z.coerce.boolean({
      message: 'Статус активности должен быть булевым.',
    }),
    meta: RegistrationLinksByMetaSchema.extend({
      initialPassword: z
        .string({ message: 'Пароль должен быть строкой.' })
        .min(USER_PASSWORD_MIN_LENGTH, {
          message: `Пароль не может быть меньше ${USER_PASSWORD_MIN_LENGTH} символов.`,
        })
        .optional(),
    }),
  })
  .partial()

@ApiSchema({
  name: 'UpdateRegistrationLinkDto',
  description: 'Данные для изменения регистрационной ссылки',
})
export class UpdateRegistrationLinkDto extends createZodDto(
  UpdateRegistrationLinkSchema
) {}
