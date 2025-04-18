import { JestConfigWithTsJest } from 'ts-jest'

import * as appConfig from '@repo/testing/jest.config'

const config: JestConfigWithTsJest = {
  ...appConfig,
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/$1',
    '^#prisma': '<rootDir>/../generated/client/index',
  },
}

module.exports = config
