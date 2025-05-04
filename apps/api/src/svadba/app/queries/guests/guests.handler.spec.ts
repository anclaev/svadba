/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing'
import { IPaginationResult } from '@repo/shared'
import { mock } from 'jest-mock-extended'

import {
  Guest,
  GUEST_ERRORS,
  GuestError,
  GuestRepository,
} from '../../../domain'

import { GuestsDto } from './guests.dto'
import { GuestsHandler } from './guests.handler'
import { GuestsQuery } from './guests.query'

describe('GuestsHandler', () => {
  let handler: GuestsHandler
  const guestRepository = mock<GuestRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GuestsHandler,
        {
          provide: GuestRepository,
          useValue: guestRepository,
        },
      ],
    }).compile()

    handler = module.get<GuestsHandler>(GuestsHandler)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('execute', () => {
    it('должен вызывать repository.findMore с правильными параметрами', async () => {
      const mockDto: GuestsDto = {
        page: 1,
        size: 10,
        login: 'test',
      }
      const query = new GuestsQuery(mockDto)
      const expectedPaginationParams = {
        page: mockDto.page,
        size: mockDto.size,
      }
      const expectedQueryParams = { login: mockDto.login }

      const mockResult: IPaginationResult<Guest> = {
        data: [
          new Guest({ id: '1', answers: {}, role: 'GUEST', side: 'BRIDE' }),
        ],
        meta: {
          currentPage: 1,
          totalPerPage: 10,
          total: 1,
          lastPage: 1,
          nextPage: 1,
          prevPage: 0,
        },
      }

      guestRepository.findMore.mockResolvedValue(mockResult)

      const result = await handler.execute(query)

      expect(guestRepository.findMore).toHaveBeenCalledWith(
        expectedPaginationParams,
        expectedQueryParams
      )
      expect(result).toEqual(mockResult)
    })

    it('должен возвращать GuestError если repository.findMore выбрасывает ошибку', async () => {
      const mockDto: GuestsDto = {
        page: 1,
        size: 10,
        login: 'test',
      }
      const query = new GuestsQuery(mockDto)

      guestRepository.findMore.mockResolvedValue(
        new GuestError(GUEST_ERRORS.GUEST_UNKNOWN_ERROR)
      )

      const result = await handler.execute(query)

      expect(result).toBeInstanceOf(GuestError)
      expect((result as GuestError).message).toEqual(
        GUEST_ERRORS.GUEST_UNKNOWN_ERROR
      )
    })

    it('должен корректно обрабатывать запрос без дополнительных параметров', async () => {
      const mockDto = { page: 1, size: 10 }
      const query = new GuestsQuery(mockDto)
      const expectedPaginationParams = {
        page: mockDto.page,
        size: mockDto.size,
      }
      const expectedQueryParams = {}

      const mockResult: IPaginationResult<Guest> = {
        data: [],
        meta: {
          currentPage: 1,
          totalPerPage: 10,
          total: 0,
          lastPage: 1,
          nextPage: 1,
          prevPage: 0,
        },
      }

      guestRepository.findMore.mockResolvedValue(mockResult)

      const result = await handler.execute(query)

      expect(guestRepository.findMore).toHaveBeenCalledWith(
        expectedPaginationParams,
        expectedQueryParams
      )
      expect(result).toEqual(mockResult)
    })
  })
})
