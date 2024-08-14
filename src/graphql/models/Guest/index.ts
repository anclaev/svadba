import { ValidationOptions } from '@pothos/plugin-zod'
import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import zod from 'zod'

import Enums from '@graphql/enums'

import { FamilyFilter } from '@graphql/models/Family'

export const Guest = builder.prismaObject('Guest', {
  fields: (t) => ({
    id: t.exposeID('id'),
    first_name: t.exposeString('first_name'),
    last_name: t.exposeString('last_name'),
    side: t.expose('side', { type: Enums.Side }),
    type: t.expose('type', { type: Enums.Type }),
    age: t.expose('age', { type: Enums.Age }),
    sex: t.expose('sex', { type: Enums.Sex }),
    table: t.exposeInt('table'),
    transfer: t.exposeBoolean('transfer'),
    accommodation: t.exposeBoolean('accommodation'),
    // events:
    family: t.relation('family'),
    familyId: t.exposeString('familyId'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const GuestSort = builder.prismaOrderBy('Guest', {
  fields: {
    id: true,
    first_name: true,
    last_name: true,
    side: true,
    type: true,
    age: true,
    sex: true,
    table: true,
    transfer: true,
    accommodation: true,
    familyId: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const GuestUniqueFilter = builder.prismaWhereUnique('Guest', {
  fields: (t) => ({
    id: t.string({
      validate: {
        schema: zod.string().uuid({ message: 'Некорректный ID' }).optional(),
      } as ValidationOptions<string>,
    }),
  }),
  validate: [
    (fields) => !!fields.id,
    { message: 'Необходимо указать ID' },
  ] as ValidationOptions<{ [x: string]: unknown }>,
})

export const GuestFilter = builder.prismaWhere('Guest', {
  fields: {
    first_name: Filters.String,
    last_name: Filters.String,
    side: Filters.Side,
    type: Filters.Type,
    age: Filters.Age,
    sex: Filters.Sex,
    table: Filters.Int,
    transfer: Filters.Boolean,
    accommodation: Filters.Boolean,
    family: FamilyFilter,
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})
