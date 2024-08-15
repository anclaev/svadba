import { builder } from '@graphql/builder'
import { ZodError } from 'zod'

import {
  AccountFilter,
  AccountSort,
  AccountUniqueFilter,
} from '@graphql/models/Account/index'

import prisma from '@utils/prisma'

export const AccountUniqueQuery = (t: any) =>
  t.prismaField({
    type: 'Account',
    nullable: true,
    errors: {
      types: [ZodError],
    },
    args: {
      where: t.arg({
        type: AccountUniqueFilter,
      }),
    },
    validate: [
      (args: any) => !!args.where,
      { message: 'Необходимо указать условие поиска' },
    ],
    resolve: async (query: any, root: any, args: any, ctx: any, info: any) =>
      prisma.account.findUnique({
        ...args,
      }),
  })

builder.queryField('accounts', (t) =>
  t.prismaConnection({
    type: 'Account',
    cursor: 'id',
    args: {
      where: t.arg({
        type: AccountFilter,
      }),
      orderBy: t.arg({
        type: AccountSort,
      }),
    },
    resolve: (query: any, _parent: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.account.findMany({ ...query, ...args })
    },
    totalCount: (connection: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.account.count({ ...args })
    },
  })
)
