import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const IdQueryParamsSchema = z.object({
  id: z
    .string({ message: 'ID должен быть строкой.' })
    .uuid({ message: 'ID должен быть uuid.' })
    .nonempty({ message: 'ID не должен быть пустым.' }),
})

@ApiSchema({
  name: 'IdQueryParamsDto',
  description: 'Параметры запроса с ID',
})
export class IdQueryParamsDto extends createZodDto(IdQueryParamsSchema) {}
