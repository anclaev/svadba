import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneFamilyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FamilyWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.FamilyUpdateInput, required: true }),
    }))

export const updateOneFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Family',
    nullable: true,
    args: updateOneFamilyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneFamilyMutation = defineMutation((t) => ({
  updateOneFamily: t.prismaField(updateOneFamilyMutationObject(t)),
}));
