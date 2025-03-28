import type { GuestRole } from '../models/user.model'

const guestDictionary: {
  [key in GuestRole]: string
} = {
  GROOM: 'Жених',
  BRIDE: 'Невеста',
  PARENT: 'Родитель',
  CLOSE: 'Близкий',
  GUEST: 'Гость',
}

export const parseGuestRole = (role: GuestRole) => guestDictionary[role]
