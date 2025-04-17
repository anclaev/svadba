import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.e2e.json' }],
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
    '^#prisma': '<rootDir>/generated/client/index',
  },
  setupFiles: ['<rootDir>/e2e/setup-env.js'],
}

module.exports = config
