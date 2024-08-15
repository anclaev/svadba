import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyFamilyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FamilyWhereInput, required: false }),
      data: t.field({ type: Inputs.FamilyUpdateManyMutationInput, required: true }),
    }))

export const updateManyFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyFamilyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.family.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyFamilyMutation = defineMutation((t) => ({
  updateManyFamily: t.field(updateManyFamilyMutationObject(t)),
}));
