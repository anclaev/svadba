'use client'

import { z } from 'zod'

export const SignInFormSchema = z.object({
  login: z.string().nonempty({ message: 'Логин не может быть пустым.' }),
  password: z.string().min(8, { message: 'Некорректный пароль.' }),
})
