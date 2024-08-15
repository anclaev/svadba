import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEventMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EventCreateInput], required: true }) }))

export const createManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Event'],
    nullable: false,
    args: createManyEventMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.event.create({ data }))),
  }),
);

export const createManyEventMutation = defineMutation((t) => ({
  createManyEvent: t.prismaField(createManyEventMutationObject(t)),
}));
