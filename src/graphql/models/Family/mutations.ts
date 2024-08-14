import { GraphQLError } from 'graphql/error'
import { ZodError } from 'zod'

import { builder } from '@graphql/builder'

import { Family, FamilyCreateInput } from '@graphql/models/Family/index'

import prisma from '@utils/prisma'

import { PRISMA_CODES } from '@enums/prisma-codes'

import { CreateFamilyDto } from '@dtos/family'

builder.mutationField('createFamily', (t) =>
  t.field({
    type: Family,
    errors: {
      types: [ZodError],
    },
    args: { data: t.arg({ type: FamilyCreateInput }) },
    resolve: async (root, args: any) => {
      const data = args.data as CreateFamilyDto

      return prisma.family
        .create({
          data,
        })
        .catch((err) => {
          switch (err.code) {
            case PRISMA_CODES.P2002: {
              throw new GraphQLError('Семья уже зарегистрирована')
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
