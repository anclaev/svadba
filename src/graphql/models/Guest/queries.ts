import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import {
  GuestFilter,
  GuestSort,
  GuestUniqueFilter,
} from '@graphql/models/Guest/index'

import prisma from '@utils/prisma'

builder.queryField('guest', (t: any) =>
  t.prismaField({
    type: 'Guest',
    nullable: true,
    errors: {
      types: [ZodError],
    },
    args: {
      where: t.arg({
        type: GuestUniqueFilter,
      }),
    },
    validate: [
      (args: any) => !!args.where,
      { message: 'Необходимо указать условие поиска' },
    ],
    resolve: async (query: any, root: any, args: any, ctx: any, info: any) =>
      prisma.family.findUnique({
        ...args,
      }),
  })
)

builder.queryField('guests', (t) =>
  t.prismaConnection({
    type: 'Guest',
    cursor: 'id',
    args: {
      where: t.arg({
        type: GuestFilter,
      }),
      orderBy: t.arg({
        type: GuestSort,
      }),
    },
    resolve: (query: any, _parent: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.guest.findMany({ ...query, ...args })
    },
    totalCount: (connection: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.guest.count({ ...args })
    },
  })
)
