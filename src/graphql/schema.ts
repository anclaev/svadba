import { builder } from '@/graphql/builder'

import './enums'
import './filters'

import '@graphql/models/Account'
import '@graphql/models/Family'
import '@graphql/models/Guest'
import '@graphql/models/Event'

export const buildSchema = () => {
  builder.queryType({
    fields: (t) => ({}),
  })

  builder.mutationType({
    fields: (t) => ({}),
  })

  return builder.toSchema()
}
