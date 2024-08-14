import { Age, Sex, Side, Status, Type } from '@prisma/client'
import { builder } from '@graphql/builder'

const Enums = {
  Sex: builder.enumType(Sex, {
    name: 'Sex',
    description: 'Пол гостя',
  }),

  Age: builder.enumType(Age, {
    name: 'Age',
    description: 'Возраст гостя',
  }),

  Status: builder.enumType(Status, {
    name: 'Status',
    description: 'Статус гостя',
  }),

  Side: builder.enumType(Side, {
    name: 'Side',
    description: 'Сторона гостя',
  }),

  Type: builder.enumType(Type, {
    name: 'Type',
    description: 'Тип гостя',
  }),
}

export default Enums
