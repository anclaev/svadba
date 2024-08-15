import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScalarFieldEnum], required: false }),
}))

export const findFirstEventQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Event',
    nullable: true,
    args: findFirstEventQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstEventQuery = defineQuery((t) => ({
  findFirstEvent: t.prismaField(findFirstEventQueryObject(t)),
}));
