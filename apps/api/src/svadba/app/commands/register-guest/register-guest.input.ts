import { CreateUserInput } from '#/user/app'
import { GuestRole, GuestSide } from '#prisma'
import { InputJsonValue } from 'generated/client/runtime/library'

export type RegisterGuestInput = CreateUserInput & {
  side: GuestSide
  guestRole?: GuestRole
  answers?: InputJsonValue
}
