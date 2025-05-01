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
    .url({ message: 'Некорректная ссылка.' }),
  icon: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Некорректная ссылка на иконку.' }),
  ]),
})

export type CreateSocialLinkFormValues = z.infer<
  typeof CreateSocialLinkFormSchema
>
