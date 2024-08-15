import { builder } from '@/graphql/builder'

import './filters'

export const buildSchema = () => {
  builder.queryType({
    fields: (t) => ({
      ok: t.string({
        resolve: () => 'Ok!',
      }),
    }),
  })

  builder.mutationType({
    fields: (t) => ({
      ok: t.string({
        resolve: () => 'Ok!',
      }),
    }),
  })

  return builder.toSchema()
}
