import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  preset: 'ts-jest',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config
