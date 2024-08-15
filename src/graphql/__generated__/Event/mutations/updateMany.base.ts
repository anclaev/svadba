import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventWhereInput, required: false }),
      data: t.field({ type: Inputs.EventUpdateManyMutationInput, required: true }),
    }))

export const updateManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEventMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.event.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventMutation = defineMutation((t) => ({
  updateManyEvent: t.field(updateManyEventMutationObject(t)),
}));
