import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const StringSchema = z.string().nonempty()
export const StringDto = createZodDto(StringSchema)

export const UrlSchema = z.string().url().nonempty()
export const UrlDto = createZodDto(UrlSchema)
