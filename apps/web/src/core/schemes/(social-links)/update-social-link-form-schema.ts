import { z } from 'zod'

export const UpdateSocialLinkFormSchema = z.object({
  title: z
    .string({ message: 'Название должно быть строкой.' })
    .nonempty({ message: 'Название не может быть пустым.' })
    .optional(),
  href: z
    .string({ message: 'Ссылка должна быть строкой.' })
    .url({ message: 'Некорректная ссылка.' })
    .nonempty({ message: 'Ссылка не может быть пустой.' }),
  icon: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Некорректная ссылка на иконку.' }),
  ]),
})

export type UpdateSocialLinkFormValues = z.infer<
  typeof UpdateSocialLinkFormSchema
>
