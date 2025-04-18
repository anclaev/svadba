import { mockedGuest, mockedGuestFactory } from '#/__test__/mocks'

import * as uuid from 'uuid'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import {
  Guest,
  GUEST_ERRORS,
  GuestError,
  GuestRepository,
} from '../../../domain'

import { CreateGuestCommand } from './create-guest.command'
import { CreateGuestHandler } from './create-guest.handler'

const mockedGuests: Guest[] = mockedGuestFactory(10)

describe('CreateGuestHandler', () => {
  let repo: DeepMockProxy<GuestRepository>

  beforeAll(() => {
    repo = mockDeep<GuestRepository>()

    repo.exists.mockImplementation((userId) =>
      Promise.resolve(!!mockedGuests.find((g) => g.userId === userId))
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    repo.create.mockImplementation((_guest) => Promise.resolve(mockedGuest))
  })

  it('должен возвращать ошибку, если гость уже существует', async () => {
    const command = new CreateGuestCommand({
      userId: mockedGuests[0].userId,
      side: 'BRIDE',
    })

    const handler = new CreateGuestHandler(repo)

    const res = await handler.execute(command)

    expect(res).toBeInstanceOf(GuestError)
    expect((res as GuestError).message).toEqual(
      GUEST_ERRORS.GUEST_ALREADY_EXISTS
    )
  })

  it('должен возвращать созданного гостя', async () => {
    jest
      .spyOn(uuid, 'v4')
      .mockReturnValue(mockedGuest.id as unknown as Uint8Array<ArrayBufferLike>)

    const spyGuestCommit = jest.spyOn(mockedGuest, 'commit')

    const command = new CreateGuestCommand({
      userId: mockedGuest.userId,
      side: mockedGuest.side,
      answers: mockedGuest.answers,
      role: mockedGuest.role,
    })

    const handler = new CreateGuestHandler(repo)

    const res = await handler.execute(command)

    expect(res).toBeInstanceOf(Guest)
    expect(res).toBe(mockedGuest)
    expect(spyGuestCommit).toHaveBeenCalled()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
