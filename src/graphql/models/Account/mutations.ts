import { GraphQLError } from 'graphql/error'
import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { Account, AccountCreateInput } from '@graphql/models/Account/index'

import { hash } from '@utils/password'
import prisma from '@utils/prisma'

import { PRISMA_CODES } from '@enums/prisma-codes'

import { CreateAccountDto } from '@dtos/account'

builder.mutationField('createAccount', (t) =>
  t.field({
    type: Account,
    errors: {
      types: [ZodError],
    },
    args: { data: t.arg({ type: AccountCreateInput }) },
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
