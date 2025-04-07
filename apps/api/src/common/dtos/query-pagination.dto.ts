import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const QueryPaginationSchema = z.object({
  page: z.coerce
    .number({ message: 'Некорректная страница элементов.' })
    .optional(),
  size: z.coerce
    .number({ message: 'Некорректное количество элементов.' })
    .optional(),
})

@ApiSchema({
  name: 'QueryPaginationDto',
  description: 'Параметры пагинации',
})
export class QueryPaginationDto extends createZodDto(QueryPaginationSchema) {}
