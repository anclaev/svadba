import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const SocialLinkByIdSchema = z.object({
  id: z.string().uuid({ message: 'Идентификатор должен быть в формате UUID' }),
})

@ApiSchema({
  name: 'SocialLinkByIdDto',
  description: 'Данные для получения ссылки по идентификатору',
})
export class SocialLinkByIdDto extends createZodDto(SocialLinkByIdSchema) {}
