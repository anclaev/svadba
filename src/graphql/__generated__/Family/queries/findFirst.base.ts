import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstFamilyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FamilyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FamilyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FamilyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FamilyScalarFieldEnum], required: false }),
}))

export const findFirstFamilyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Family',
    nullable: true,
    args: findFirstFamilyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.family.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstFamilyQuery = defineQuery((t) => ({
  findFirstFamily: t.prismaField(findFirstFamilyQueryObject(t)),
}));
