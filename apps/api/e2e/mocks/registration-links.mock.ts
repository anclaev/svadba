import { RegistrationLink } from '#prisma'

export const mockRegistrationLinks: RegistrationLink[] = [
  {
    id: '8aef09fb-d437-6345-b457-1b78142c7e15',
    createdAt: new Date(),
    expiresAt: new Date(),
    isActive: true,
    status: 'PENDING',
    meta: {
      login: 'test1',
    },
    ownerId: '8aef09fb-d437-4819-b457-1b78142c7e15',
  },
  {
    id: '8aef09fb-d437-9864-b457-1b78142c7e15',
    createdAt: new Date(),
    expiresAt: new Date(),
    isActive: false,
    status: 'APPLIED',
    meta: {
      login: 'test2',
    },
    ownerId: '8aef09fb-d437-4819-b457-1b78142c7e15',
  },
]
