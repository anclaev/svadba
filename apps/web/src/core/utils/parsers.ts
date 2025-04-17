import type { GuestRole, GuestSide } from '../models/user.model'

const guestRoleDictionary: {
  [key in GuestRole]: string
} = {
  GROOM: 'Жених',
  BRIDE: 'Невеста',
  PARENT: 'Родственник',
  CLOSE: 'Близкий',
  GUEST: 'Гость',
}

const guestSideDictionary: {
  [key in GuestSide]: string
} = {
  BRIDE: 'Невеста',
  GROOM: 'Жених',
}

export const parseGuestRole = (role: GuestRole) => guestRoleDictionary[role]
export const parseGuestSide = (side: GuestSide) => guestSideDictionary[side]
