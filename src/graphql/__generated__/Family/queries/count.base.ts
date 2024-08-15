import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countFamilyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FamilyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FamilyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FamilyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FamilyScalarFieldEnum], required: false }),
}))

export const countFamilyQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countFamilyQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.family.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countFamilyQuery = defineQuery((t) => ({
  countFamily: t.field(countFamilyQueryObject(t)),
}));
