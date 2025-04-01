import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { QueryPaginationSchema } from '#/common/dtos/query-pagination.dto'
import { ApiSchema } from '@nestjs/swagger'

const GetSocialLinksSchema = QueryPaginationSchema.extend({
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
  icon: z
    .string({
      message: 'Иконка должна быть строкой.',
    })
    .nonempty({ message: 'Иконка не должна быть пустой.' })
    .optional(),
  creatorId: z
    .string({
      message: 'Идентификатор создателя быть строкой.',
    })
    .uuid({ message: 'Идентификатор создателя должен быть uuid.' })
    .optional(),
})

@ApiSchema({
  name: 'GetSocialLinksDto',
  description: 'Параметры списка ссылок',
})
export class GetSocialLinksDto extends createZodDto(GetSocialLinksSchema) {}
