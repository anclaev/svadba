import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countGuestQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.GuestWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.GuestOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.GuestWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.GuestScalarFieldEnum], required: false }),
}))

export const countGuestQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countGuestQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.guest.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countGuestQuery = defineQuery((t) => ({
  countGuest: t.field(countGuestQueryObject(t)),
}));
