import { GuestRole, GuestSide } from '#prisma'
import { InputJsonValue } from 'generated/client/runtime/library'

export type CreateGuestInput = {
  userId: string
  side: GuestSide
  role?: GuestRole
  answers?: InputJsonValue
}
