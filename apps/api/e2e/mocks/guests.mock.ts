import { GuestRole, GuestSide, UserRole, UserStatus } from '#prisma'

import { IGuestModel } from '#/svadba/domain'
import { User } from '#/user/domain'

export const mockGuests: IGuestModel[] = [
  {
    id: '833f4293-eba8-46b7-9dea-7e78b2189948',
    userId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    user: null,
    answers: {},
    role: GuestRole.BRIDE,
    side: GuestSide.BRIDE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd815e52d-0f69-4769-8ec6-c581f4794459',
    userId: 'add67164-71a3-44ca-90a8-337421db0b36',
    user: null,
    answers: {},
    role: GuestRole.GUEST,
    side: GuestSide.GROOM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockGuestsWithUsers: IGuestModel[] = [
  {
    id: '833f4293-eba8-46b7-9dea-7e78b2189948',
    userId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    user: {
      id: '8aef09fb-d437-4819-b457-1b78142c7e15',
      // 'testpassword'
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$88jcwGfI8M/lEX4usr975A$dD0djovYthAyaaGLjpG6LxBYx1AAVS9jo02T3Dbg9iE',
      login: 'test_admin',
      isTelegramVerified: false,
      credentials: [],
      name: 'Test 1',
      role: UserRole.ADMIN,
      telegramId: null,
      status: UserStatus.ACCEPTED,
      createdAt: new Date(),
      guestId: '833f4293-eba8-46b7-9dea-7e78b2189948',
    } as unknown as User,
    answers: {},
    role: GuestRole.BRIDE,
    side: GuestSide.BRIDE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd815e52d-0f69-4769-8ec6-c581f4794459',
    userId: 'add67164-71a3-44ca-90a8-337421db0b36',
    user: {
      id: 'add67164-71a3-44ca-90a8-337421db0b36',
      // 'testpassword'
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$88jcwGfI8M/lEX4usr975A$dD0djovYthAyaaGLjpG6LxBYx1AAVS9jo02T3Dbg9iE',
      login: 'test_public',
      isTelegramVerified: false,
      credentials: [],
      name: 'Test 2',
      role: UserRole.PUBLIC,
      telegramId: null,
      status: UserStatus.CREATED,
      createdAt: new Date(),
      guestId: 'd815e52d-0f69-4769-8ec6-c581f4794459',
    } as unknown as User,
    answers: {},
    role: GuestRole.GUEST,
    side: GuestSide.GROOM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
