import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { v4 } from 'uuid'

import {
  Guest,
  GUEST_ERRORS,
  GuestError,
  GuestRepository,
} from '../../../domain'

import { GuestByIdHandler } from './guest-by-id.handler'
import { GuestByIdQuery } from './guest-by-id.query'

import { mockedGuestFactory } from '#/__test__/mocks/guest.mock'

const mockedGuests: Guest[] = mockedGuestFactory(5)

const mockFindById = (id: string) => {
  const guest = mockedGuests.find((g) => g.id === id)
  if (guest) return guest
  return new GuestError('GUEST_NOT_FOUND')
}

describe('GuestByIdHandler', () => {
  let repo: DeepMockProxy<GuestRepository>

  beforeAll(() => {
    repo = mockDeep<GuestRepository>()

    repo.findById.mockImplementation((id) => Promise.resolve(mockFindById(id)))
  })

  it('должен возвращать ошибку, если гость не найден', async () => {
    const query = new GuestByIdQuery(v4())

    const handler = new GuestByIdHandler(repo)

    const res = await handler.execute(query)

    expect(res).toBeInstanceOf(GuestError)
    expect((res as GuestError).message).toEqual(GUEST_ERRORS.GUEST_NOT_FOUND)
  })

  it('должен возвращать найденного гостя', async () => {
    const query = new GuestByIdQuery(mockedGuests[0].id)

    const handler = new GuestByIdHandler(repo)

    const res = await handler.execute(query)

    expect(res).toBeInstanceOf(Guest)
    expect((res as Guest).userId).toStrictEqual(mockedGuests[0].userId)
  })
})
