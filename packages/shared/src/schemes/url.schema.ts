import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UrlSchema = z.string().url().nonempty()
export const UrlDto = createZodDto(UrlSchema)
