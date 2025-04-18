import { JestConfigWithTsJest } from 'ts-jest'

import * as appConfig from '@repo/testing/jest.config'

const config: JestConfigWithTsJest = {
  ...appConfig,
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc-node/jest',
      {
        jsc: {
          target: 'esnext',
        },
      },
    ],
  },
}

module.exports = config
