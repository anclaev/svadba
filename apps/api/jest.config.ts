import * as appConfig from '@repo/testing/jest.config'

const config = {
  ...appConfig,
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/$1',
    '^#prisma': '<rootDir>/../generated/client/index',
  },
  transform: {
    '^.+\\.(t|j)s?$': [
      '@swc-node/jest',
      {
        exclude: [],
      },
    ],
  },
}

module.exports = config
