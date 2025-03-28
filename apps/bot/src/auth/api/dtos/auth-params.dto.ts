import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const AuthParamsQuery = z.object({
  grant_type: z
    .enum(['token', 'cookie'], { message: 'Некорректный тип гранта.' })
    .default('cookie'),
})

@ApiSchema({ name: 'AuthPropsDto', description: 'Параметры авторизации' })
export class AuthParamsDto extends createZodDto(AuthParamsQuery) {}
