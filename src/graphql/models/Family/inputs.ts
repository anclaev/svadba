import { builder } from '@graphql/builder'
import zod from 'zod'

export const FamilyCreateInput = builder.prismaCreate('Family', {
  name: 'FamilyCreateInput',
  fields: (t) => ({
    name: t.string({
      required: true,
      validate: {
        schema: zod
          .string({ message: 'Название обязательно' })
          .min(2, { message: 'Название не может быть менее 2 символов' }),
      },
    }),
    ownerId: t.string({
      required: true,
      validate: {
        schema: zod
          .string({ message: 'Создатель обязателен' })
          .uuid({ message: 'Некорректный ID создателя' }),
      },
    }),
  }),
})
