import * as dotenv from 'dotenv'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { LoggerService } from '#/core/logger'

import { configSchema } from '../config.schema'
import { ConfigService } from '../config.service'

import { mockEnv } from '#/__test__/mocks/env.mock'

describe('ConfigService', () => {
  let logger: DeepMockProxy<LoggerService>

  beforeAll(() => {
    logger = mockDeep<LoggerService>()

    logger.info.mockImplementation((msg: string) => {})
    logger.error.mockImplementation((err: string) => {})

    jest.spyOn(dotenv, 'config').mockImplementation(() => ({}))
    jest.spyOn(LoggerService, 'getInstance').mockReturnValue(logger)
  })

  it('должен завершать процесс, если проверка переменных не прошла', async () => {
    const mockSafeParse = jest.spyOn(configSchema, 'safeParse')
    const mockLoggerError = jest.spyOn(logger, 'error')

    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`${code}`)
    })

    mockSafeParse.mockImplementation(() => ({
      success: false,
      data: undefined,
      error: {
        errors: [
          {
            code: 'custom',
            path: [''],
            message: 'error',
          },
        ],
        issues: [],
        format: () => ({ _errors: [] }),
        message: '',
        isEmpty: true,
        addIssue: (s: any) => {},
        addIssues: (s: any) => {},
        name: '',
        flatten: () => ({
          formErrors: [],
          fieldErrors: {},
        }),
        formErrors: {
          fieldErrors: {},
          formErrors: [],
        },
      },
    }))

    expect(() => {
      const config = ConfigService.getInstance()
    }).toThrow()

    expect(mockLoggerError).toHaveBeenCalledWith(`[] error`)
    expect(mockExit).toHaveBeenCalledWith(1)

    mockSafeParse.mockRestore()
    mockLoggerError.mockRestore()
  })

  it('должен инициализироваться', () => {
    const mockSafeParse = jest.spyOn(configSchema, 'safeParse')
    const mockLoggerInfo = jest.spyOn(logger, 'info')

    mockSafeParse.mockImplementation(() => ({
      success: true,
      data: mockEnv,
    }))

    const service = ConfigService.getInstance()

    expect(service).toBeDefined()
    expect(mockLoggerInfo).toHaveBeenCalled()

    mockSafeParse.mockRestore()
    mockLoggerInfo.mockRestore()
  })

  it('должен возвращать значение конфигурации', () => {
    const mockSafeParse = jest.spyOn(configSchema, 'safeParse')

    mockSafeParse.mockImplementation(() => ({
      success: true,
      data: mockEnv,
    }))

    const service = ConfigService.getInstance()

    expect(service.get('NODE_ENV')).toBe('test')

    mockSafeParse.mockRestore()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
