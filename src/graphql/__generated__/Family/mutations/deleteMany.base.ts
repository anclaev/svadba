import * as Inputs from '@graphql/__generated__/inputs';
import { BatchPayload } from '../../objects';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyFamilyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FamilyWhereInput, required: true }) }))

export const deleteManyFamilyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyFamilyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.family.deleteMany({ where: args.where }),
  }),
);

export const deleteManyFamilyMutation = defineMutation((t) => ({
  deleteManyFamily: t.field(deleteManyFamilyMutationObject(t)),
}));
