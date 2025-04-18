import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as winston from 'winston'

import { LoggerService } from './logger.service'

jest.mock('winston', () => {
  const original = jest.requireActual('winston')

  return {
    ...original,
    createLogger: () => ({
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

describe('LoggerService', () => {
  let mockLogger: DeepMockProxy<winston.Logger>

  beforeAll(() => {
    mockLogger = mockDeep<winston.Logger>()
  })

  it('должен инициализироваться', () => {
    const logger = LoggerService.getInstance()

    expect(logger).toBeDefined()
  })
})
