import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScalarFieldEnum], required: false }),
}))

export const countEventQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.event.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventQuery = defineQuery((t) => ({
  countEvent: t.field(countEventQueryObject(t)),
}));
