import { ValidationOptions } from '@pothos/plugin-zod'
import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import zod from 'zod'

import { GuestListFilter } from '@graphql/models/Guest'

export const Event = builder.prismaNode('Event', {
  id: { field: 'id' },
  fields: (t) => ({
    index: t.exposeInt('index'),
    alias: t.exposeString('alias'),
    name: t.exposeString('name'),
    date: t.expose('date', { type: 'Date' }),
    start: t.expose('start', { type: 'Date' }),
    end: t.expose('end', { type: 'Date' }),
    description: t.exposeString('description'),
    address: t.exposeString('address'),
    url: t.exposeString('url'),
    guests: t.relation('guests'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

// TODO: Решить проблему циркулярной зависимости EventSort и GuestSort

export const EventSort = builder.prismaOrderBy('Event', {
  fields: () => ({
    id: true,
    alias: true,
    name: true,
    date: true,
    start: true,
    end: true,
    createdAt: true,
    updatedAt: true,
  }),
})

export const EventFilter = builder.prismaWhere('Event', {
  fields: () => ({
    id: Filters.ID,
    index: Filters.Int,
    alias: Filters.String,
    name: Filters.String,
    date: Filters.Date,
    start: Filters.Date,
    end: Filters.Date,
    description: Filters.String,
    address: Filters.String,
    url: Filters.String,
    guests: GuestListFilter,
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  }),
})

export const EventUniqueFilter = builder.prismaWhereUnique('Event', {
  fields: (t) => ({
    id: t.string({
      validate: {
        schema: zod.string().uuid({ message: 'Некорректный ID' }).optional(),
      } as ValidationOptions<string>,
    }),
    alias: t.string({
      validate: {
        schema: zod
          .string({ message: 'Некорректный алиас' })
          .min(2, { message: 'Алиас не может быть менее 2 символов' })
          .optional(),
      } as ValidationOptions<string>,
    }),
    index: t.int({
      validate: {
        schema: zod.number({ message: 'Некорректный индекс' }).optional(),
      } as ValidationOptions<number>,
    }),
  }),
  validate: [
    (fields) => !!fields.id || !!fields.alias || fields.index,
    { message: 'Необходимо указать ID, алиас или индекс' },
  ] as ValidationOptions<{ [x: string]: unknown }>,
})

export const EventListFilter = builder.prismaListFilter(EventUniqueFilter, {
  ops: ['every', 'some', 'none'],
})
