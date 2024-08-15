import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyFamilyMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.FamilyCreateInput], required: true }) }))

export const createManyFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Family'],
    nullable: false,
    args: createManyFamilyMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.family.create({ data }))),
  }),
);

export const createManyFamilyMutation = defineMutation((t) => ({
  createManyFamily: t.prismaField(createManyFamilyMutationObject(t)),
}));
