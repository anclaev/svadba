import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyGuestMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.GuestWhereInput, required: true }) }))

export const deleteManyGuestMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyGuestMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.guest.deleteMany({ where: args.where }),
  }),
);

export const deleteManyGuestMutation = defineMutation((t) => ({
  deleteManyGuest: t.field(deleteManyGuestMutationObject(t)),
}));
