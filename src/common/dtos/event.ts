import { CreateGuestWithoutEventsDto } from '@dtos/guest'

type CreateEventBaseDto = {
  index: string
  alias?: string
  name: string
  date: Date
  start: string
  end: string
  description: string
  address?: string
  url?: string
}

export type CreateEventDto = {
  guests?: {
    connect?: {
      id: string
    }
    create?: CreateGuestWithoutEventsDto
  }[]
} & CreateEventBaseDto

export type CreateEventWithoutGuests = CreateEventBaseDto
