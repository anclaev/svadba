import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneFamilyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FamilyWhereUniqueInput, required: true }) }))

export const deleteOneFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Family',
    nullable: true,
    args: deleteOneFamilyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneFamilyMutation = defineMutation((t) => ({
  deleteOneFamily: t.prismaField(deleteOneFamilyMutationObject(t)),
}));
