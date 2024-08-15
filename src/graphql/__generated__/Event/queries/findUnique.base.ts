import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventWhereUniqueInput, required: true }) }))

export const findUniqueEventQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Event',
    nullable: true,
    args: findUniqueEventQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventQuery = defineQuery((t) => ({
  findUniqueEvent: t.prismaField(findUniqueEventQueryObject(t)),
}));
