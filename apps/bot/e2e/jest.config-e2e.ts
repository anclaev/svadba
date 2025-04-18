import { JestConfigWithTsJest } from 'ts-jest'

import * as appConfig from '@repo/testing/jest.config-e2e'

const config: JestConfigWithTsJest = {
  ...appConfig,
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
