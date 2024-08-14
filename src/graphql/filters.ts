import { Sex, Status, Type, Side, Age } from '@prisma/client'
import zod from 'zod'

import { FilterShape, OpsOptions } from '@pothos/plugin-prisma-utils'

import { builder } from '@graphql/builder'

const enumOps: OpsOptions<
  any,
  { MALE: 'MALE'; FEMALE: 'FEMALE' },
  keyof FilterShape<unknown>
> = ['equals', 'not', 'in', 'notIn']

const Filters = {
  String: builder.prismaFilter('String', {
    name: 'StringFilter',
    ops: ['contains', 'equals', 'startsWith', 'not'],
    validate: {
      schema: zod.object({}).catchall(zod.string().optional()),
    },
  }),
  StringList: builder.prismaScalarListFilter('String', {
    name: 'StringListFilter',
    ops: ['has', 'hasSome', 'hasEvery', 'isEmpty', 'equals'],
    validate: {
      schema: zod.object({}).catchall(zod.array(zod.string())),
    },
  }),
  ID: builder.prismaFilter('ID', {
    name: 'IDFilter',
    ops: ['equals', 'not'],
    validate: {
      schema: zod.object({}).catchall(zod.string().uuid().optional()),
    },
  }),
  IDList: builder.prismaScalarListFilter('ID', {
    name: 'IDListFilter',
    ops: ['has', 'hasSome', 'hasEvery', 'isEmpty', 'equals'],
    validate: {
      schema: zod.object({}).catchall(zod.array(zod.string().uuid())),
    },
  }),
  Int: builder.prismaFilter('Int', {
    name: 'IntFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
    validate: {
      schema: zod.object({}).catchall(zod.number().optional()),
    },
  }),
  Float: builder.prismaFilter('Float', {
    name: 'FloatFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
    validate: {
      schema: zod.object({}).catchall(zod.string().optional()),
    },
  }),
  Boolean: builder.prismaFilter('Boolean', {
    name: 'BooleanFilter',
    ops: ['equals', 'not'],
    validate: {
      schema: zod.object({}).catchall(zod.boolean().optional()),
    },
  }),
  Date: builder.prismaFilter('Date', {
    name: 'DateFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
    validate: {
      schema: zod.object({}).catchall(zod.date().optional()),
    },
  }),
  Sex: builder.prismaFilter(Sex, {
    name: 'SexFilter',
    ops: enumOps,
    validate: {
      schema: zod.object({}).catchall(zod.nativeEnum(Sex).optional()),
    },
  }),
  Status: builder.prismaFilter(Status, {
    name: 'StatusFilter',
    ops: enumOps,
    validate: {
      schema: zod.object({}).catchall(zod.nativeEnum(Status).optional()),
    },
  }),
  Type: builder.prismaFilter(Type, {
    name: 'TypeFilter',
    ops: enumOps,
    validate: {
      schema: zod.object({}).catchall(zod.nativeEnum(Type).optional()),
    },
  }),
  Side: builder.prismaFilter(Side, {
    name: 'SideFilter',
    ops: enumOps,
    validate: {
      schema: zod.object({}).catchall(zod.nativeEnum(Side).optional()),
    },
  }),
  Age: builder.prismaFilter(Age, {
    name: 'AgeFilter',
    ops: enumOps,
    validate: {
      schema: zod.object({}).catchall(zod.nativeEnum(Age).optional()),
    },
  }),
}

export default Filters
