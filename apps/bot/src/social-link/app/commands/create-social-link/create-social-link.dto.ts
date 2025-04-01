import { ApiSchema } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const CreateSocialLinkSchema = z.object({
  alias: z
    .string({ message: 'Алиас должен быть строкой.' })
    .nonempty({ message: 'Алиас не может быть пустым.' }),
  title: z
    .string({ message: 'Название должно быть строкой.' })
    .nonempty({ message: 'Название не может быть пустым.' }),
  href: z
    .string({ message: 'Ссылка должна быть строкой.' })
    .url({ message: 'Некорректная ссылка.' })
    .nonempty({ message: 'Ссылка не может быть пустым.' }),
  icon: z
    .string({ message: 'Иконка должна быть строкой.' })
    .url({ message: 'Иконка должна быть ссылкой.' })
    .optional(),
  creatorId: z
    .string({
      message: 'Идентификатор создателя должен быть строкой.',
    })
    .uuid({ message: 'Идентификатор должен быть uuid.' })
    .optional(),
})

@ApiSchema({
  name: 'CreateSocialLinkDto',
  description: 'Данные для создания ссылки',
})
export class CreateSocialLinkDto extends createZodDto(CreateSocialLinkSchema) {}
