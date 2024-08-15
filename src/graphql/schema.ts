import { builder } from '@/graphql/builder'

import { generateAllCrud } from '@graphql/__generated__/autocrud'

generateAllCrud()

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
