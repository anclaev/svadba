import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventCreateInput, required: true }),
      update: t.field({ type: Inputs.EventUpdateInput, required: true }),
    }))

export const upsertOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: false,
    args: upsertOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventMutation = defineMutation((t) => ({
  upsertOneEvent: t.prismaField(upsertOneEventMutationObject(t)),
}));
