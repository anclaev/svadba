import * as Inputs from '@graphql/__generated__/inputs';import prisma from '@core/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyGuestMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.GuestCreateInput], required: true }) }))

export const createManyGuestMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Guest'],
    nullable: false,
    args: createManyGuestMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.guest.create({ data }))),
  }),
);

export const createManyGuestMutation = defineMutation((t) => ({
  createManyGuest: t.prismaField(createManyGuestMutationObject(t)),
}));
