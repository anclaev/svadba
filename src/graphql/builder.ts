import PrismaUtils from '@pothos/plugin-prisma-utils'
import ErrorsPlugin from '@pothos/plugin-errors'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import { DateResolver } from 'graphql-scalars'
import ZodPlugin from '@pothos/plugin-zod'
import SchemaBuilder from '@pothos/core'
import type PrismaTypes from '@pothos'
import { ZodError } from 'zod'

import { flattenErrors } from '@utils/zod'
import client from '@utils/prisma'

type SchemaOptions = {
  PrismaTypes: PrismaTypes
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}

export const builder = new SchemaBuilder<SchemaOptions>({
  plugins: [ErrorsPlugin, RelayPlugin, PrismaPlugin, PrismaUtils, ZodPlugin],
  prisma: {
    client,
    exposeDescriptions: true,
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
})

const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
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

builder.addScalarType('Date', DateResolver)
