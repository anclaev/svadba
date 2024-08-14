import { builder } from '@graphql/builder'
import zod from 'zod'

export const AccountCreateInput = builder.prismaCreate('Account', {
  name: 'AccountCreateInput',
  fields: (t) => ({
    email: t.string({
      required: true,
      validate: {
        schema: zod
          .string({ message: 'Email обязателен' })
          .email({ message: 'Некорректный email' }),
      },
    }),
    password: t.string({
      required: true,
      validate: {
        schema: zod
          .string({ message: 'Пароль обязателен' })
          .min(8, { message: 'Пароль не может быть менее 8 символов' }),
      },
    }),
  }),
})
