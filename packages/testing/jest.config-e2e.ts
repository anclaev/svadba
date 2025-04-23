import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s?$': [
      '@swc-node/jest',
      {
        exclude: [],
      },
    ],
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
