import { Scalars } from 'prisma-generator-pothos-codegen'
import PrismaTypes from '@graphql/__generated__/pothos'
import PrismaUtils from '@pothos/plugin-prisma-utils'
import ErrorsPlugin from '@pothos/plugin-errors'
import PrismaPlugin from '@pothos/plugin-prisma'
import ZodPlugin from '@pothos/plugin-zod'
import SchemaBuilder from '@pothos/core'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

import { flattenErrors } from '@utils/zod'
import prisma from '@core/prisma'

type SchemaOptions = {
  PrismaTypes: PrismaTypes
  Scalars: Scalars<
    Prisma.Decimal,
    Prisma.InputJsonValue | null,
    Prisma.InputJsonValue
  >
}

export const builder = new SchemaBuilder<SchemaOptions>({
  plugins: [ErrorsPlugin, PrismaPlugin, PrismaUtils, ZodPlugin],
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
})

export const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
})

const ZodFieldError = builder
  .objectRef<{
    message: string
    path: string[]
  }>('ZodFieldError')
  .implement({
    fields: (t) => ({
      message: t.exposeString('message'),
      path: t.exposeStringList('path'),
    }),
  })

builder.objectType(ZodError, {
  name: 'ZodError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    error: t.field({
      type: [ZodFieldError],
      resolve: (err) => flattenErrors(err.format(), []),
    }),
  }),
})
