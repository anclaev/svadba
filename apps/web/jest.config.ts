import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  testEnvironment: 'jsdom',
  coverageReporters: ['text', 'lcov'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // ...
    '^@/(.*)$': '<rootDir>/$1',
  },
  passWithNoTests: true,
}

export default createJestConfig(config)
