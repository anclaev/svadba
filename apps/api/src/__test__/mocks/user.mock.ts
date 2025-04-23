import { v4 } from 'uuid'

import { User } from '#/user/domain'

export const mockedUser: User = new User({
  id: v4(),
  login: 'test',
  name: 'Test',
  password: 'hashedPassword',
  isTelegramVerified: false,
  role: 'PUBLIC',
  status: 'CREATED',
  telegramId: null,
  guestId: null,
  credentials: [],
  createdAt: new Date(),
})
