import { v4 } from 'uuid'

import { Guest } from '#/svadba/domain'
import { IUserModel } from '#/user/domain'

import { mockedUser } from './user.mock'

export const mockedGuest = new Guest({
  id: v4(),
  role: 'GUEST',
  side: 'BRIDE',
  answers: {},
  createdAt: new Date(),
})

export const mockedGuestWithUser = new Guest({
  id: v4(),
  role: 'GUEST',
  side: 'BRIDE',
  answers: {},
  userId: mockedUser.id,
  user: mockedUser as unknown as IUserModel,
  createdAt: new Date(),
})

export const mockedGuestFactory = (size: number = 1): Guest[] => {
  const res: Guest[] = []
  for (let index = 0; index <= size; index++) {
    res.push(
      new Guest({
        id: v4(),
        role: 'GUEST',
        side: 'BRIDE',
        answers: {},
        userId: v4(),
        createdAt: new Date(),
      })
    )
  }
  return res
}
