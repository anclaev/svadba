import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventWhereInput, required: true }) }))

export const deleteManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.event.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventMutation = defineMutation((t) => ({
  deleteManyEvent: t.field(deleteManyEventMutationObject(t)),
}));
