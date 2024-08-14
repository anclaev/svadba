import { builder } from '@/graphql/builder'

import './enums'
import './filters'

import '@graphql/models/Account'
import '@graphql/models/Family'
import '@graphql/models/Guest'

import { AccountUniqueQuery } from '@/graphql/models/Account'
import { FamilyUniqueQuery } from '@/graphql/models/Family'

export const buildSchema = () => {
  builder.queryType({
    fields: (t) => ({
      account: AccountUniqueQuery(t),
      family: FamilyUniqueQuery(t),
    }),
  })

  builder.mutationType({
    fields: (t) => ({
      hi: t.field({
        type: 'String',
        resolve: async (root, args) => {
          return 'hii'
        },
      }),
    }),
  })

  return builder.toSchema()
}
