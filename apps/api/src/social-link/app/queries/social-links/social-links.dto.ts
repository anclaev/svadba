import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { QueryPaginationSchema } from '#/common/dtos'

const SocialLinksSchema = QueryPaginationSchema.extend({
  alias: z
    .string({
      message: 'Алиас должен быть строкой.',
    })
    .nonempty({ message: 'Алиас не должен быть пустым.' })
    .optional(),
  title: z
    .string({
      message: 'Название должно быть строкой.',
    })
    .nonempty({ message: 'Название не должно быть пустым.' })
    .optional(),
  href: z
    .string({
      message: 'Ссылка должна быть строкой.',
    })
    .nonempty({ message: 'Ссылка не должна быть пустой.' })
    .optional(),
  creatorLogin: z
    .string({
      message: 'Логин создателя быть строкой.',
    })
    .nonempty({ message: 'Логин создателя не должен быть пустым.' })
    .optional(),
})

@ApiSchema({
  name: 'SocialLinksDto',
  description: 'Данные для получения списка социальных ссылок',
})
export class SocialLinksDto extends createZodDto(SocialLinksSchema) {}
