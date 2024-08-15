import { Age, Sex, Side, Type, Prisma } from '@prisma/client'
import { ValidationOptions } from '@pothos/plugin-zod'
import { InputObjectRef } from '@pothos/core'
import { builder } from '@graphql/builder'
import zod from 'zod'

import {
  EventCreateWithoutGuestsInput,
  EventUniqueFilter,
} from '@graphql/models/Event'

import Enums from '@graphql/enums'

const createFields = (t: any) => ({
  first_name: t.string({
    required: true,
    validate: {
      schema: zod
        .string({ message: 'Имя обязательно' })
        .min(2, { message: 'Имя не может быть менее 2 символов' }),
    } as ValidationOptions<string>,
  }),
  last_name: t.string({
    validate: {
      schema: zod
        .string()
        .min(2, { message: 'Фамилия не может быть менее 2 символов' })
        .optional(),
    } as ValidationOptions<string>,
  }),
  side: t.field({
    type: Enums.Side,
    required: true,
    validate: {
      schema: zod.nativeEnum(Side),
    } as ValidationOptions<'GROOM' | 'BRIDE'>,
  }),
  type: t.field({
    type: Enums.Type,
    validate: {
      schema: zod.nativeEnum(Type).optional(),
    } as ValidationOptions<
      | 'COLLEAGUE'
      | 'FRIEND'
      | 'BEST_FRIEND'
      | 'RELATIVE'
      | 'CLOSE_RELATIVE'
      | 'PARENT'
    >,
  }),
  age: t.field({
    type: Enums.Age,
    validate: {
      schema: zod.nativeEnum(Age).optional(),
    } as ValidationOptions<'ADULT' | 'CHILD'>,
  }),
  sex: t.field({
    type: Enums.Sex,
    required: true,
    validate: {
      schema: zod.nativeEnum(Sex),
    } as ValidationOptions<'MALE' | 'FEMALE'>,
  }),
  table: t.int({
    validate: {
      schema: zod
        .number()
        .min(1, { message: 'Номер стола должен быть от 1 до 20' })
        .max(20, { message: 'Номер стола должен быть от 1 до 20' }),
    } as ValidationOptions<number>,
  }),
  transfer: t.boolean({
    validate: {
      schema: zod.boolean(),
    } as ValidationOptions<boolean>,
  }),
  accommodation: t.boolean({
    validate: {
      schema: zod.boolean(),
    } as ValidationOptions<boolean>,
  }),
  familyId: t.string({
    required: true,
    validate: {
      schema: zod.string().uuid({ message: 'Некорректный ID семьи' }),
    } as ValidationOptions<string>,
  }),
})

export const GuestCreateInput: InputObjectRef<any, any> = builder.prismaCreate(
  'Guest',
  {
    name: 'GuestCreateInput',
    fields: (t: any): any => ({
      ...createFields(t),
      events: GuestCreateEventsInput,
    }),
  }
)

export const GuestCreateEventsInput = builder.prismaCreateRelation(
  'Guest',
  'events',
  {
    fields: () => ({
      create: EventCreateWithoutGuestsInput,
      connect: EventUniqueFilter,
    }),
  }
)

export const GuestCreateWithoutEventsInput = builder.prismaCreate('Guest', {
  name: 'GuestCreateWithoutEventsInput',
  fields: (t) => createFields(t),
})
