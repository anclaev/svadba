import { IGuestModel } from '#/svadba/domain'
import { GuestRole, GuestSide } from '#prisma'

export const mockGuests: IGuestModel[] = [
  {
    id: '833f4293-eba8-46b7-9dea-7e78b2189948',
    userId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    answers: {},
    role: GuestRole.BRIDE,
    side: GuestSide.BRIDE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd815e52d-0f69-4769-8ec6-c581f4794459',
    userId: 'add67164-71a3-44ca-90a8-337421db0b36',
    answers: {},
    role: GuestRole.GUEST,
    side: GuestSide.GROOM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
