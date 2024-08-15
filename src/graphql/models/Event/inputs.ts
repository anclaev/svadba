import { InputObjectRef } from '@pothos/core'
import { builder } from '@graphql/builder'
import zod from 'zod'

import {
  GuestCreateWithoutEventsInput,
  GuestUniqueFilter,
} from '@graphql/models/Guest'

import { translitRegexp } from '@utils/regexp'

const createFields = (t: any) => ({
  index: t.int({
    required: true,
    validate: {
      schema: zod.number({ message: 'Некорректный индекс' }),
    },
  }),
  alias: t.string({
    required: false,
    validate: {
      schema: zod
        .string({ message: 'Некорректный алиас' })
        .regex(translitRegexp, { message: 'Некорректный алиас' })
        .optional(),
    },
  }),
  name: t.string({
    required: true,
    validate: {
      schema: zod.string({ message: 'Некорректное название' }),
    },
  }),
  date: t.field({
    type: 'Date',
    required: true,
    validate: {
      schema: zod.date({ message: 'Некорректная дата' }),
    },
  }),
  start: t.field({
    type: 'Time',
    required: true,
    validate: {
      schema: zod.date({ message: 'Некорректное время начала' }),
    },
  }),
  end: t.field({
    type: 'Time',
    required: true,
    validate: {
      schema: zod.date({ message: 'Некорректное время окончания' }),
    },
  }),
  description: t.string({
    required: true,
    validate: {
      schema: zod.string({ message: 'Некорректное описание' }),
    },
  }),
  address: t.string({
    required: false,
    validate: {
      schema: zod.string({ message: 'Некорректный адрес' }).optional(),
    },
  }),
  url: t.string({
    required: false,
    validate: {
      schema: zod.string({ message: 'Некорректная ссылка' }).optional(),
    },
  }),
})

export const EventCreateInput: InputObjectRef<any, any> = builder.prismaCreate(
  'Event',
  {
    name: 'EventCreateInput',
    fields: (t: any): any => ({
      ...createFields(t),
      guests: EventCreateGuestsInput,
    }),
  }
)

export const EventCreateGuestsInput = builder.prismaCreateRelation(
  'Event',
  'guests',
  {
    fields: () => ({
      create: GuestCreateWithoutEventsInput,
      connect: GuestUniqueFilter,
    }),
  }
)

export const EventCreateWithoutGuestsInput = builder.prismaCreate('Event', {
  name: 'EventCreateWithoutGuestsInput',
  fields: (t) => createFields(t),
})
