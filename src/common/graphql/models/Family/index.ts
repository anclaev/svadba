import { ValidationOptions } from '@pothos/plugin-zod'
import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import zod from 'zod'

builder.prismaObject('Family', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    owner: t.relation('owner'),
    ownerId: t.exposeString('ownerId'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const FamilySort = builder.prismaOrderBy('Family', {
  fields: {
    id: true,
    name: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const FamilyUniqueFilter = builder.prismaWhereUnique('Family', {
  fields: (t) => ({
    id: t.string({
      validate: {
        schema: zod.string().uuid({ message: 'Некорректный ID' }).optional(),
      } as ValidationOptions<string>,
    }),
    ownerId: t.string({
      validate: {
        schema: zod.string().uuid({ message: 'Некорректный ID' }).optional(),
      } as ValidationOptions<string>,
    }),
  }),
  validate: [
    (fields) => !!fields.id || !!fields.ownerId,
    { message: 'Необходимо указать ID или ID главы семьи' },
  ] as ValidationOptions<{ [x: string]: unknown }>,
})

export const FamilyFilter = builder.prismaWhere('Family', {
  fields: {
    name: Filters.String,
    // members:
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})

export * from './queries'
