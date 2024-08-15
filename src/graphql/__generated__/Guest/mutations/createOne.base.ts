import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneGuestMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.GuestCreateInput, required: true }) }))

export const createOneGuestMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Guest',
    nullable: false,
    args: createOneGuestMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.create({ data: args.data, ...query }),
  }),
);

export const createOneGuestMutation = defineMutation((t) => ({
  createOneGuest: t.prismaField(createOneGuestMutationObject(t)),
}));
