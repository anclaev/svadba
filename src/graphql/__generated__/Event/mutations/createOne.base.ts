import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventCreateInput, required: true }) }))

export const createOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: false,
    args: createOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.create({ data: args.data, ...query }),
  }),
);

export const createOneEventMutation = defineMutation((t) => ({
  createOneEvent: t.prismaField(createOneEventMutationObject(t)),
}));
