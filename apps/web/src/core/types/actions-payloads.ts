import { GuestSide } from '../models/user.model'

export type AuthorizeUserActionPayload = {
  login: string
  password: string
}

export type RegisterUserActionPayload = {
  login: string
  password: string
  name: string
  side: GuestSide
  answers?: JSON
}
