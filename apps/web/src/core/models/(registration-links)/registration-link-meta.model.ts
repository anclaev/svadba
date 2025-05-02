import { GuestRole, GuestSide, UserRole } from '../user.model'

export type RegistrationLinkMeta = {
  login?: string
  initialPassword?: string
  name?: string
  role?: UserRole
  guestSide?: GuestSide
  guestRole?: GuestRole
}
