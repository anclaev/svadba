import { Age, Sex, Side, Type } from '@prisma/client'
import { CreateEventWithoutGuests } from '@dtos/event'

type CreateGuestBaseDto = {
  first_name: string
  last_name?: string
  side: Side
  type?: Type
  age?: Age
  sex: Sex
  table?: number
  transfer?: boolean
  accommodation?: boolean
  familyId: string
}

export type CreateGuestDto = {
  events?: {
    connect?: {
      id: string
    }
    create?: CreateEventWithoutGuests
  }[]
} & CreateGuestBaseDto

export type CreateGuestWithoutEventsDto = CreateGuestBaseDto
