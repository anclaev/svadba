import { object, string, ZodFormattedError } from 'zod'

export function flattenErrors(
  error: ZodFormattedError<unknown>,
  path: string[]
): { path: string[]; message: string }[] {
  const errors = error._errors.map((message) => ({
    path,
    message,
  }))

  Object.keys(error).forEach((key) => {
    if (key !== '_errors') {
      errors.push(
        ...flattenErrors(
          (error as Record<string, unknown>)[key] as ZodFormattedError<unknown>,
          [...path, key]
        )
      )
    }
  })

  return errors
}

export const signInSchema = object({
  email: string({ required_error: 'Почта обязательна' })
    .min(1, 'Почта обязательна')
    .email('Некорректная почта'),
  password: string({ required_error: 'Пароль обязателен' })
    .min(1, 'Пароль обязателен')
    .min(8, 'Пароль не может быть меньше 8 символов')
    .max(32, 'Пароль не может превышать 32 символа'),
})
