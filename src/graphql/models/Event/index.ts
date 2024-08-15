import { builder } from '@graphql/builder'

export const Event = builder.prismaNode('Event', {
  id: { field: 'id' },
  fields: (t) => ({}),
})
