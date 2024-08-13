import { ValidationOptions } from '@pothos/plugin-zod'
import { builder } from '@graphql/builder'
import Filters from '@graphql/filters'
import Enums from '@graphql/enums'
import zod from 'zod'

builder.prismaObject('Account', {
  fields: (t) => ({
    id: t.exposeID('id'),
    status: t.expose('status', { type: Enums.Status }),
    password: t.exposeString('password'),
    email: t.exposeString('email'),
    family: t.relation('family'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

export const AccountSort = builder.prismaOrderBy('Account', {
  fields: {
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  },
})

export const AccountUniqueFilter = builder.prismaWhereUnique('Account', {
  fields: (t) => ({
    id: t.string({
      validate: {
        schema: zod.string().uuid({ message: 'Некорректный ID' }).optional(),
      } as ValidationOptions<string>,
    }),
    email: t.string({
      validate: {
        schema: zod
          .string()
          .email({ message: 'Некорректный email' })
          .optional(),
      } as ValidationOptions<string>,
    }),
    familyId: t.string({
      validate: {
        schema: zod
          .string()
          .uuid({ message: 'Некорректный ID семьи' })
          .optional(),
      } as ValidationOptions<string>,
    }),
  }),
  validate: [
    (fields) => !!fields.id || !!fields.email || fields.familyId,
    { message: 'Необходимо указать ID, email или ID семьи' },
  ] as ValidationOptions<{ [x: string]: unknown }>,
})

export const AccountFilter = builder.prismaWhere('Account', {
  fields: {
    status: Filters.Status,
    email: Filters.String,
    createdAt: Filters.Date,
    updatedAt: Filters.Date,
  },
})

export * from './queries'
