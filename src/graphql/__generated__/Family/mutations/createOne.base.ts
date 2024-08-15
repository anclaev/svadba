import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneFamilyMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.FamilyCreateInput, required: true }) }))

export const createOneFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Family',
    nullable: false,
    args: createOneFamilyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.create({ data: args.data, ...query }),
  }),
);

export const createOneFamilyMutation = defineMutation((t) => ({
  createOneFamily: t.prismaField(createOneFamilyMutationObject(t)),
}));
