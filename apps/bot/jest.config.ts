import * as appConfig from '@repo/testing/jest.config'

const config = {
  ...appConfig,
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
