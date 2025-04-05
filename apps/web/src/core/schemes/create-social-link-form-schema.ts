import { z } from 'zod'

export const CreateSocialLinkFormSchema = z.object({
  alias: z
    .string({ message: 'Алиас должен быть строкой.' })
    .nonempty({ message: 'Алиас не может быть пустым.' }),
  title: z
    .string({ message: 'Название должно быть строкой.' })
    .nonempty({ message: 'Название не может быть пустым.' }),
  href: z
    .string({ message: 'Ссылка должна быть строкой.' })
    .url({ message: 'Некорректная ссылка.' })
    .nonempty({ message: 'Ссылка не может быть пустой.' }),
  icon: z
    .string({ message: 'Иконка должна быть строкой.' })
    .url({ message: 'Иконка должна быть ссылкой.' })
    .optional(),
})

export type CreateSocialLinkFormValues = z.infer<
  typeof CreateSocialLinkFormSchema
>
