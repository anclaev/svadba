import { GraphQLError } from 'graphql/error'
import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { Guest, GuestCreateInput } from '@graphql/models/Guest'

import prisma from '@utils/prisma'

import { PRISMA_CODES } from '@enums/prisma-codes'

import type { CreateGuestDto } from '@dtos/guest'

builder.mutationField('createGuest', (t: any) =>
  t.field({
    type: Guest,
    errors: {
      types: [ZodError],
    },
    args: { data: t.arg({ type: GuestCreateInput }) },
    resolve: async (root: any, args: any) => {
      const data = args.data as CreateGuestDto

      if (data.events)
        return prisma.guest.create({ data: data as any }).catch((err) => {
          switch (err.code) {
            case PRISMA_CODES.P2002: {
              throw new GraphQLError('Гость уже зарегистрирован')
            }
            default: {
              console.log(err)
              throw new GraphQLError('Некорректный запрос')
            }
          }
        })
    },
    validate: [
      (args: any) => !!args.data,
      { message: 'Необходимо указать данные' },
    ],
  })
)
