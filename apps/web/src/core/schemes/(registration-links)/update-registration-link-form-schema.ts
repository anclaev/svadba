import { z } from 'zod'

export const UpdateRegistrationLinkFormSchema = z.object({
  expiresAt: z.coerce
    .date({ message: 'Срок действия должен быть датой.' })
    .optional(),
  isActive: z
    .boolean({ message: 'Флаг активности должен быть булевым.' })
    .optional(),
  login: z
    .string({ message: 'Логин должен быть строкой.' })
    .nonempty({ message: 'Логин не может быть пустым.' })
    .optional(),
  name: z
    .string({ message: 'Имя должно быть строкой.' })
    .nonempty({ message: 'Имя не может быть пустым.' })
    .optional(),
  guestSide: z
    .enum(['GROOM', 'BRIDE'], {
      message: 'Некорректная сторона гостя.',
    })
    .optional(),
  guestRole: z
    .enum(['GUEST', 'CLOSE', 'PARENT', 'GROOM', 'BRIDE'], {
      message: 'Некорректная роль гостя.',
    })
    .optional(),
  isAdmin: z.boolean().optional(),
  initialPassword: z
    .string({ message: 'Некорректный пароль.' })
    .min(8, { message: 'Пароль не может быть меньше 8 символов.' })
    .optional(),
})

export type UpdateRegistrationLinkFormValues = z.infer<
  typeof UpdateRegistrationLinkFormSchema
>
