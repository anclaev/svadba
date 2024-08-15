import { builder } from '@graphql/builder'
import { ZodError } from 'zod'

import {
  FamilyFilter,
  FamilySort,
  FamilyUniqueFilter,
} from '@graphql/models/Family/index'

import prisma from '@utils/prisma'

export const FamilyUniqueQuery = (t: any) =>
  t.prismaField({
    type: 'Family',
    nullable: true,
    errors: {
      types: [ZodError],
    },
    args: {
      where: t.arg({
        type: FamilyUniqueFilter,
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

builder.queryField('families', (t) =>
  t.prismaConnection({
    type: 'Family',
    cursor: 'id',
    args: {
      where: t.arg({
        type: FamilyFilter,
      }),
      sort: t.arg({
        type: FamilySort,
      }),
    },
    resolve: (query: any, _parent: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.family.findMany({ ...query, ...args })
    },
    totalCount: (connection: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.family.count({ ...args })
    },
  })
)
