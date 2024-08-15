import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyGuestQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.GuestWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.GuestOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.GuestWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.GuestScalarFieldEnum], required: false }),
}))

export const findManyGuestQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Guest'],
    nullable: false,
    args: findManyGuestQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.findMany({
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

export const findManyGuestQuery = defineQuery((t) => ({
  findManyGuest: t.prismaField(findManyGuestQueryObject(t)),
}));
