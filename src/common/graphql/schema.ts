import { builder } from '@graphql/builder'

import './enums'
import './filters'

import '@graphql/models/Account'
import '@graphql/models/Family'

import { AccountUniqueQuery } from '@graphql/models/Account'
import { FamilyUniqueQuery } from '@graphql/models/Family'

export const buildSchema = () => {
  builder.queryType({
    fields: (t) => ({
      ok: t.boolean({
        resolve: () => true,
      }),
      account: AccountUniqueQuery(t),
      family: FamilyUniqueQuery(t),
    }),
  })

  return builder.toSchema()
}
