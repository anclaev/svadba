import { GuestRole, GuestSide } from '#prisma'

export interface IGuestQueryParams {
  side: GuestSide[]
  role: GuestRole[]
}
