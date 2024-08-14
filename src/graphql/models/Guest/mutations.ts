import { GraphQLError } from 'graphql/error'
import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { Guest, GuestCreateInput } from '@graphql/models/Guest/index'

import prisma from '@utils/prisma'

import { CreateGuestDto } from '@dtos/guest'

builder.mutationField('createGuest', (t) =>
  t.field({
    type: Guest,
    errors: {
      types: [ZodError],
    },
    args: { data: t.arg({ type: GuestCreateInput }) },
    resolve: async (root, args: any) => {
      const data = args.data as CreateGuestDto

      return prisma.guest.create({ data }).catch(() => {
        throw new GraphQLError('Некорректный запрос')
      })
    },
    validate: [
      (args: any) => !!args.data,
      { message: 'Необходимо указать данные' },
    ],
  })
)
