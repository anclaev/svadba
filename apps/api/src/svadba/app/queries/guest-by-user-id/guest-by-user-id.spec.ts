import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { v4 } from 'uuid'

import {
  Guest,
  GUEST_ERRORS,
  GuestError,
  GuestRepository,
} from '../../../domain'

import { GuestByUserIdHandler } from './guest-by-user-id.handler'
import { GuestByUserIdQuery } from './guest-by-user-id.query'

import { mockedGuestFactory } from '#/__test__/mocks/guest.mock'

const mockedGuests: Guest[] = mockedGuestFactory(5)

const mockFindByUserId = (userId: string) => {
  const guest = mockedGuests.find((g) => g.userId === userId)
  if (guest) return guest
  return new GuestError('GUEST_NOT_FOUND')
}

describe('GuestByUserIdHandler', () => {
  let repo: DeepMockProxy<GuestRepository>

  beforeAll(() => {
    repo = mockDeep<GuestRepository>()

    repo.findByUserId.mockImplementation((userId) =>
      Promise.resolve(mockFindByUserId(userId))
    )
  })

  it('должен возвращать ошибку, если гость не найден', async () => {
    const query = new GuestByUserIdQuery(v4())

    const handler = new GuestByUserIdHandler(repo)

    const res = await handler.execute(query)

    expect(res).toBeInstanceOf(GuestError)
    expect((res as GuestError).message).toEqual(GUEST_ERRORS.GUEST_NOT_FOUND)
  })

  it('должен возвращать найденного гостя', async () => {
    const query = new GuestByUserIdQuery(mockedGuests[0].userId)

    const handler = new GuestByUserIdHandler(repo)

    const res = await handler.execute(query)

    expect(res).toBeInstanceOf(Guest)
    expect((res as Guest).userId).toStrictEqual(mockedGuests[0].userId)
  })
})
