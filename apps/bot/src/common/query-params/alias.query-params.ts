import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const AliasQueryParamsSchema = z.object({
  alias: z
    .string({ message: 'Алиас должен быть строкой.' })
    .nonempty({ message: 'Алиас не должен быть пустым.' }),
})

@ApiSchema({
  name: 'AliasQueryParamsDto',
  description: 'Параметры запроса с алиасом',
})
export class AliasQueryParamsDto extends createZodDto(AliasQueryParamsSchema) {}
