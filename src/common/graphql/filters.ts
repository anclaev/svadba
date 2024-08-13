import { Sex, Status, Type, Side, Age } from '@prisma/client'

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
  }),
  StringList: builder.prismaScalarListFilter('String', {
    name: 'StringListFilter',
    ops: ['has', 'hasSome', 'hasEvery', 'isEmpty', 'equals'],
  }),
  ID: builder.prismaFilter('ID', {
    name: 'IDFilter',
    ops: ['equals', 'not'],
  }),
  IDList: builder.prismaScalarListFilter('ID', {
    name: 'IDListFilter',
    ops: ['has', 'hasSome', 'hasEvery', 'isEmpty', 'equals'],
  }),
  Int: builder.prismaFilter('Int', {
    name: 'IntFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
  }),
  Float: builder.prismaFilter('Float', {
    name: 'FloatFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
  }),
  Boolean: builder.prismaFilter('Boolean', {
    name: 'BooleanFilter',
    ops: ['equals', 'not'],
  }),
  Date: builder.prismaFilter('Date', {
    name: 'DateFilter',
    ops: ['equals', 'not', 'in', 'lt', 'gt', 'lte', 'gte'],
  }),
  Sex: builder.prismaFilter(Sex, {
    name: 'SexFilter',
    ops: enumOps,
  }),
  Status: builder.prismaFilter(Status, {
    name: 'StatusFilter',
    ops: enumOps,
  }),
  Type: builder.prismaFilter(Type, {
    name: 'TypeFilter',
    ops: enumOps,
  }),
  Side: builder.prismaFilter(Side, {
    name: 'SideFilter',
    ops: enumOps,
  }),
  Age: builder.prismaFilter(Age, {
    name: 'AgeFilter',
    ops: enumOps,
  }),
}

export default Filters
