import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const StringSchema = z.string().nonempty()
export const StringDto = createZodDto(StringSchema)
