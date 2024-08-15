import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventWhereUniqueInput, required: true }) }))

export const deleteOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: true,
    args: deleteOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventMutation = defineMutation((t) => ({
  deleteOneEvent: t.prismaField(deleteOneEventMutationObject(t)),
}));
