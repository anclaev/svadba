import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyGuestMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.GuestWhereInput, required: false }),
      data: t.field({ type: Inputs.GuestUpdateManyMutationInput, required: true }),
    }))

export const updateManyGuestMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyGuestMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.guest.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyGuestMutation = defineMutation((t) => ({
  updateManyGuest: t.field(updateManyGuestMutationObject(t)),
}));
