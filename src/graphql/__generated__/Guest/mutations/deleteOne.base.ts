import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneGuestMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.GuestWhereUniqueInput, required: true }) }))

export const deleteOneGuestMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Guest',
    nullable: true,
    args: deleteOneGuestMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneGuestMutation = defineMutation((t) => ({
  deleteOneGuest: t.prismaField(deleteOneGuestMutationObject(t)),
}));
