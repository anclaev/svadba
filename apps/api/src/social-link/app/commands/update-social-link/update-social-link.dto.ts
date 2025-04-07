import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const UpdateSocialLinkSchema = z.object({
  title: z
    .string({ message: 'Название должно быть строкой.' })
    .nonempty({ message: 'Название не может быть пустым.' })
    .optional(),
  href: z
    .string({ message: 'Ссылка должна быть строкой.' })
    .url({ message: 'Некорректная ссылка.' })
    .nonempty({ message: 'Ссылка не может быть пустым.' })
    .optional(),
  icon: z
    .string({ message: 'Иконка должна быть строкой.' })
    .url({ message: 'Иконка должна быть ссылкой.' })
    .optional(),
})

export class UpdateSocialLinkDto extends createZodDto(UpdateSocialLinkSchema) {}
