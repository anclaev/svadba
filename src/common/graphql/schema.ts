import { builder } from '@graphql/builder'

import './enums'

import './types/Account'
import './types/Family'

export const buildSchema = () => {
  builder.queryType({
    fields: (t) => ({
      ok: t.boolean({
        resolve: () => true,
      }),
    }),
  })

  return builder.toSchema()
}
