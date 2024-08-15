import { GraphQLError } from 'graphql/error'
import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { Event, EventCreateInput } from '@graphql/models/Event/index'

import translit from '@utils/translit'
import prisma from '@utils/prisma'

import { PRISMA_CODES } from '@enums/prisma-codes'

import type { CreateEventDto } from '@dtos/event'

builder.mutationField('createEvent', (t: any) =>
  t.field({
    type: Event,
    errors: {
      types: [ZodError],
    },
    args: {
      data: t.arg({ type: EventCreateInput }),
    },
    resolve: async (root: any, { data }: { data: CreateEventDto }) => {
      if (!data.alias) data.alias = translit.transform(data.name, '-')

      return prisma.event
        .create({
          data: {
            ...(data as any),
            alias: data.alias!.toLowerCase(),
          },
        })
        .then((data) => data)
        .catch((err) => {
          switch (err.code) {
            case PRISMA_CODES.P2002: {
              throw new GraphQLError('Мероприятие уже зарегистрировано')
            }
            default: {
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
