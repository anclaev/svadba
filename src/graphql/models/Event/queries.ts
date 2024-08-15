import { builder } from '@graphql/builder'
import { ZodError } from 'zod'

import {
  EventFilter,
  EventSort,
  EventUniqueFilter,
} from '@graphql/models/Event/index'

import prisma from '@utils/prisma'

builder.queryField('event', (t: any) =>
  t.prismaField({
    type: 'Event',
    nullable: true,
    errors: {
      types: [ZodError],
    },
    args: {
      where: t.arg({
        type: EventUniqueFilter,
      }),
    },
    validate: [
      (args: any) => !!args.where,
      { message: 'Необходимо указать условие поиска' },
    ],
    resolve: async (query: any, root: any, args: any) =>
      prisma.event.findUnique({ ...args }),
  })
)

builder.queryField('events', (t) =>
  t.prismaConnection({
    type: 'Event',
    cursor: 'id',
    errors: {
      types: [ZodError],
    },
    args: {
      where: t.arg({
        type: EventFilter,
      }),
      orderBy: t.arg({
        type: EventSort,
      }),
    },
    resolve: (query: any, _parent: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.event.findMany({ ...query, ...args })
    },
    totalCount: (connection: any, _args: any) => {
      const { after, first, ...args } = _args

      return prisma.event.count({ ...args })
    },
  })
)
