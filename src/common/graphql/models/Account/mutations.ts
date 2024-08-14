import { InputObjectRef } from '@pothos/core'
import { GraphQLError } from 'graphql/error'
import { Prisma } from '@prisma/client'
import zod, { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { hash } from '@utils/password'
import prisma from '@utils/prisma'

import { PRISMA_CODES } from '@enums/prisma-codes'

import { CreateAccountDto } from '@dtos/account'
import { PickFields } from '@pothos/plugin-prisma-utils'
import { Account } from '@graphql/models/Account/index'

const AccountCreate: InputObjectRef<
  any,
  PickFields<
    Prisma.AccountCreateInput,
    Partial<Record<keyof Prisma.AccountCreateInput, unknown>>
  >
> = builder.prismaCreate('Account', {
  name: 'AccountCreate',
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

builder.mutationField('createAccount', (t) =>
  t.field({
    type: Account,
    errors: {
      types: [ZodError],
    },
    args: { data: t.arg({ type: AccountCreate }) },
    resolve: async (root, args) => {
      const { email, password } = args.data as CreateAccountDto

      const hashed = await hash(password)

      return prisma.account
        .create({
          data: {
            email,
            password: hashed,
          },
        })
        .then((data) => ({ ...data, password: '' }))
        .catch((err) => {
          switch (err.code) {
            case PRISMA_CODES.P2002: {
              throw new GraphQLError('Почта уже зарегистрирована')
            }
            default: {
              throw new GraphQLError('Некорректный запрос')
            }
          }
        })
    },
    validate: [
      (args: any) => !!args.data,
      { message: 'Необходимо указать данные' },
    ],
  })
)
