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
