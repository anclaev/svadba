import { Age, Sex, Side, Type } from '@prisma/client'

export type CreateGuestDto = {
  first_name: string
  last_name?: string
  side: Side
  type?: Type
  age?: Age
  sex: Sex
  table?: number
  transfer?: boolean
  accommodation?: boolean
  //   events:
  familyId: string
}
