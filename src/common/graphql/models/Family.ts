import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'

import prisma from '@utils/prisma'

builder.prismaObject('Family', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    owner: t.relation('owner'),
    ownerId: t.exposeString('ownerId'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const FamilySort = builder.prismaOrderBy('Family', {
  fields: {
    id: true,
    name: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const FamilyUniqueFilter = builder.prismaWhereUnique('Family', {
  fields: (t) => ({
    id: 'String',
    ownerId: 'String',
  }),
})

export const FamilyFilter = builder.prismaWhere('Family', {
  fields: {
    name: Filters.String,
    // members:
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})

builder.queryField('families', (t) =>
  t.prismaConnection({
    type: 'Family',
    cursor: 'id',
    args: {
      filter: t.arg({
        type: FamilyFilter,
      }),
      sort: t.arg({
        type: FamilySort,
      }),
    },
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.family.findMany({ ...query }),
  })
)

export const FamilyUniqueQuery = (t: any) =>
  t.prismaField({
    type: 'Family',
    nullable: true,
    args: {
      where: t.arg({
        type: FamilyUniqueFilter,
      }),
    },
    resolve: async (query: any, root: any, args: any, ctx: any, info: any) =>
      prisma.family.findUnique({
        ...args,
      }),
  })
