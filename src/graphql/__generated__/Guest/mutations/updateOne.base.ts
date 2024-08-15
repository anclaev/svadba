import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneGuestMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.GuestWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.GuestUpdateInput, required: true }),
    }))

export const updateOneGuestMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Guest',
    nullable: true,
    args: updateOneGuestMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneGuestMutation = defineMutation((t) => ({
  updateOneGuest: t.prismaField(updateOneGuestMutationObject(t)),
}));
