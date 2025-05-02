import * as appConfig from '@repo/testing/jest.config-e2e'

const config = {
  ...appConfig,
  setupFiles: ['<rootDir>/e2e/setup-env.js'],
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
