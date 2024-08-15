import { ValidationOptions } from '@pothos/plugin-zod'
import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import zod from 'zod'

import Enums from '@graphql/enums'

import { EventListFilter, EventSort } from '@graphql/models/Event'
import { FamilyFilter } from '@graphql/models/Family'

export const Guest = builder.prismaNode('Guest', {
  id: { field: 'id' },
  fields: (t: any) => ({
    guestId: t.exposeString('id'),
    first_name: t.exposeString('first_name'),
    last_name: t.exposeString('last_name'),
    side: t.expose('side', { type: Enums.Side }),
    type: t.expose('type', { type: Enums.Type }),
    age: t.expose('age', { type: Enums.Age }),
    sex: t.expose('sex', { type: Enums.Sex }),
    table: t.exposeInt('table'),
    transfer: t.exposeBoolean('transfer'),
    accommodation: t.exposeBoolean('accommodation'),
    events: t.relation('events'),
    family: t.relation('family'),
    familyId: t.exposeString('familyId'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const GuestSort = builder.prismaOrderBy('Guest', {
  fields: () => ({
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
    events: EventSort,
    familyId: true,
    createdAt: true,
    updatedAt: true,
  }),
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
    events: EventListFilter,
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})

export const GuestListFilter = builder.prismaListFilter(GuestUniqueFilter, {
  ops: ['every', 'some', 'none'],
})

export * from './inputs'
export * from './queries'
export * from './mutations'
