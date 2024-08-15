import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneGuestMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.GuestWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.GuestCreateInput, required: true }),
      update: t.field({ type: Inputs.GuestUpdateInput, required: true }),
    }))

export const upsertOneGuestMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Guest',
    nullable: false,
    args: upsertOneGuestMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.guest.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneGuestMutation = defineMutation((t) => ({
  upsertOneGuest: t.prismaField(upsertOneGuestMutationObject(t)),
}));
