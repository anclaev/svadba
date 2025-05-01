import { z } from 'zod'

export const CreateRegistrationLinkFormSchema = z.object({
  expiration: z.coerce.number({ message: 'Срок действия должен быть числом.' }),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .nonempty({ message: 'Логин не может быть пустым.' })
    .optional(),
  name: z
    .string({ message: 'Логин должен быть строкой.' })
    .nonempty({ message: 'Логин не может быть пустым.' })
    .optional(),
  guestSide: z
    .enum(['GROOM', 'BRIDE'], {
      message: 'Некорректная сторона гостя.',
    })
    .optional(),
  guestRole: z
    .enum(['GUEST', 'CLOSE', 'PARENT'], {
      message: 'Некорректная роль гостя.',
    })
    .optional(),
  isAdmin: z.boolean().optional(),
  initialPassword: z
    .string({ message: 'Некорректный пароль.' })
    .min(8, { message: 'Пароль не может быть меньше 8 символов.' })
    .optional(),
})

export type CreateRegistrationLinkFormValues = z.infer<
  typeof CreateRegistrationLinkFormSchema
>
