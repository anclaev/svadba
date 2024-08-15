import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueFamilyQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FamilyWhereUniqueInput, required: true }) }))

export const findUniqueFamilyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Family',
    nullable: true,
    args: findUniqueFamilyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueFamilyQuery = defineQuery((t) => ({
  findUniqueFamily: t.prismaField(findUniqueFamilyQueryObject(t)),
}));
