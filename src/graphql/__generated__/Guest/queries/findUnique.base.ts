import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueGuestQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.GuestWhereUniqueInput, required: true }) }))

export const findUniqueGuestQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Guest',
    nullable: true,
    args: findUniqueGuestQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueGuestQuery = defineQuery((t) => ({
  findUniqueGuest: t.prismaField(findUniqueGuestQueryObject(t)),
}));
