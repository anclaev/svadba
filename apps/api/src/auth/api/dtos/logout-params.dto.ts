import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const LogoutParamsQuery = z.object({
  rtid: z.string({ message: 'Некорректный rtid.' }).optional(),
})

@ApiSchema({
  name: 'LogoutPropsDto',
  description: 'Параметры выхода из системы',
})
export class LogoutParamsDto extends createZodDto(LogoutParamsQuery) {}
