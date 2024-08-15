import { Age, Sex, Side, Status, Type } from '@prisma/client'
import { builder } from '@graphql/builder'

const Enums = {
  Sex: builder.enumType(Sex, {
    name: 'Sex',
  }),

  Age: builder.enumType(Age, {
    name: 'Age',
  }),

  Status: builder.enumType(Status, {
    name: 'Status',
  }),

  Side: builder.enumType(Side, {
    name: 'Side',
  }),

  Type: builder.enumType(Type, {
    name: 'Type',
  }),
}

export default Enums
