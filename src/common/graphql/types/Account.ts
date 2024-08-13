import { builder } from '@graphql/builder'
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

builder.queryField('accounts', (t) =>
  t.prismaConnection({
    type: 'Account',
    cursor: 'id',
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.account.findMany({ ...query }),
  })
)
