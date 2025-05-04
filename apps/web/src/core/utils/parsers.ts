import type { RegistrationLinkStatus } from '../models/(registration-links)'
import type {
  GuestRole,
  GuestSide,
  UserRole,
  UserStatus,
} from '../models/user.model'

const guestRoleDictionary: {
  [key in GuestRole]: string
} = {
  GROOM: 'Жених',
  BRIDE: 'Невеста',
  PARENT: 'Родственник',
  CLOSE: 'Близкий',
  GUEST: 'Гость',
} as const

const guestSideDictionary: {
  [key in GuestSide]: string
} = {
  BRIDE: 'Невеста',
  GROOM: 'Жених',
} as const

const userStatusDictionary: {
  [key in UserStatus]: string
} = {
  ACCEPTED: 'Подтверждён',
  BLOCKED: 'Заблокирован',
  CREATED: 'Создан',
} as const

const userRoleDictionary: {
  [key in UserRole]: string
} = {
  ADMIN: 'Администратор',
  PUBLIC: 'Пользователь',
} as const

const registationListStatusDictionary: {
  [key in RegistrationLinkStatus]: string
} = {
  APPLIED: 'Использована',
  PENDING: 'Ожидает',
} as const

export const parseUserRole = (role: UserRole) => userRoleDictionary[role]
export const parseUserStatus = (status: UserStatus) =>
  userStatusDictionary[status]
export const parseGuestRole = (role: GuestRole) => guestRoleDictionary[role]
export const parseGuestSide = (side: GuestSide) => guestSideDictionary[side]
export const parseRegistrationLinkStatus = (status: RegistrationLinkStatus) =>
  registationListStatusDictionary[status]
