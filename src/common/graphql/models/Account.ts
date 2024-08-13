import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import Enums from '@graphql/enums'

import prisma from '@utils/prisma'

builder.prismaObject('Account', {
  fields: (t) => ({
    id: t.exposeID('id'),
    status: t.expose('status', { type: Enums.Status }),
    password: t.exposeString('password'),
    email: t.exposeString('email'),
    family: t.relation('family'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const AccountSort = builder.prismaOrderBy('Account', {
  fields: {
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const AccountUniqueFilter = builder.prismaWhereUnique('Account', {
  fields: (t) => ({
    id: 'String',
    email: 'String',
    familyId: 'String',
  }),
})

export const AccountFilter = builder.prismaWhere('Account', {
  fields: {
    status: Filters.Status,
    email: Filters.String,
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})

builder.queryField('accounts', (t) =>
  t.prismaConnection({
    type: 'Account',
    cursor: 'id',
    args: {
      filter: t.arg({
        type: AccountFilter,
      }),
      sort: t.arg({
        type: AccountSort,
      }),
    },
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.account.findMany({ ...query }),
  })
)

export const AccountUniqueQuery = (t: any) =>
  t.prismaField({
    type: 'Account',
    nullable: true,
    args: {
      where: t.arg({
        type: AccountUniqueFilter,
      }),
    },
    resolve: async (query: any, root: any, args: any, ctx: any, info: any) =>
      prisma.account.findUnique({
        ...args,
      }),
  })
