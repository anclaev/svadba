import { loadPackageDefinition } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { LoggerService } from '#/core/logger'

import { createProto, loadProto } from '../utils'

jest.mock('@grpc/grpc-js', () => {
  const original = jest.requireActual('@grpc/grpc-js')

  return {
    ...original,
    loadPackageDefinition: jest.fn(),
  }
})

describe('loadProto', () => {
  let logger: DeepMockProxy<LoggerService>

  beforeAll(() => {
    logger = mockDeep<LoggerService>()
    logger.error.mockImplementation((err: string) => {})

    jest.spyOn(LoggerService, 'getInstance').mockReturnValue(logger)
  })

  it('должен исполняться', () => {
    const mockLoadSync = jest
      .spyOn(protoLoader, 'loadSync')
      .mockReturnValue(true)

    const res = loadProto('')

    expect(res).toBe(true)
    mockLoadSync.mockRestore()
  })

  it('должен логировать ошибку загрузки proto', () => {
    const mockLoggerError = jest.spyOn(logger, 'error')

    const mockLoadSync = jest
      .spyOn(protoLoader, 'loadSync')
      .mockImplementation(() => {
        throw new Error()
      })

    const res = loadProto('')

    expect(res).toBeNull()
    expect(mockLoadSync).toHaveBeenCalled()
    expect(mockLoggerError).toHaveBeenCalled()

    mockLoggerError.mockRestore()
    mockLoadSync.mockRestore()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

describe('createProto', () => {
  it('должен исполняться', () => {
    loadPackageDefinition.mockReturnValue(true)

    const res = createProto({})

    expect(res).toBe(true)
  })
})
// TODO
describe('createClient', () => {})

describe('health', () => {})

describe('sendMessage', () => {})
