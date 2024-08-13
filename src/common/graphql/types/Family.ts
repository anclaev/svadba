import { builder } from '@graphql/builder'

const Family = builder.prismaObject('Family', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    owner: t.relation('owner'),
    ownerId: t.exposeString('ownerId'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export default Family
