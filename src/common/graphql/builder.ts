import PrismaUtils from '@pothos/plugin-prisma-utils'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import { DateResolver } from 'graphql-scalars'
import SchemaBuilder from '@pothos/core'
import type PrismaTypes from '@pothos'

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
  plugins: [PrismaPlugin, PrismaUtils, RelayPlugin],
  prisma: {
    client,
    exposeDescriptions: { fields: true, models: true },
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
})

builder.addScalarType('Date', DateResolver)
