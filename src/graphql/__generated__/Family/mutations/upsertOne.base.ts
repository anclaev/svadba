import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneFamilyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FamilyWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.FamilyCreateInput, required: true }),
      update: t.field({ type: Inputs.FamilyUpdateInput, required: true }),
    }))

export const upsertOneFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Family',
    nullable: false,
    args: upsertOneFamilyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneFamilyMutation = defineMutation((t) => ({
  upsertOneFamily: t.prismaField(upsertOneFamilyMutationObject(t)),
}));
