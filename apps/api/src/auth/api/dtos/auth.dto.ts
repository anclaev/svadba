import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const AuthQuery = z.object({
  grant_type: z
    .enum(['token', 'cookie'], { message: 'Некорректный тип гранта.' })
    .default('cookie'),
})

@ApiSchema({ name: 'AuthDto', description: 'Параметры авторизации' })
export class AuthDto extends createZodDto(AuthQuery) {}
