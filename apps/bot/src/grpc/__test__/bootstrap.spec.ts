import { LoggerService } from '#/core/logger'
import { mock, MockProxy } from 'jest-mock-extended'

import { bootstrapGrpcServer } from '../bootstrap'
import { loadProto } from '../utils'

jest.mock('../utils', () => {
  const original = jest.requireActual('../utils')

  return {
    ...original,
    loadProto: jest.fn(),
    createProto: jest.fn(),
  }
})

describe('BoostrapGrpcServer', () => {
  let logger: MockProxy<LoggerService>

  beforeAll(() => {
    logger = mock<LoggerService>()

    jest.spyOn(LoggerService, 'getInstance').mockReturnValue(logger)
  })

  it('должен завершать приложение, если proto не предоставлены', async () => {
    loadProto.mockReturnValue(false)

    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`${code}`)
    })

    try {
      await bootstrapGrpcServer(1111)
    } catch (e) {
      expect(e.message).toBe('1')
    }

    expect(mockExit).toHaveBeenCalledWith(1)

    mockExit.mockRestore()
  })

  //   it('должен исполняться', async () => {
  //     loadProto.mockReturnValue(true)
  //     createProto.mockReturnValue(true)

  //     const mockLoggerInfo = jest.spyOn(logger, 'info')

  //     await bootstrapGrpcServer(1111)

  //     // expect(mockReflectionAddToServer).toHaveBeenCalled()
  //     // expect(mockServerAddService).toHaveBeenCalled()
  //     // expect(mockServerBindAsync).toHaveBeenCalled()
  //     expect(mockLoggerInfo).toHaveBeenCalled()
  //   })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
