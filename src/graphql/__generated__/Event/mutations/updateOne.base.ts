import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventUpdateInput, required: true }),
    }))

export const updateOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: true,
    args: updateOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventMutation = defineMutation((t) => ({
  updateOneEvent: t.prismaField(updateOneEventMutationObject(t)),
}));
