import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  rootDir: 'src',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      { tsconfig: '<rootDir>/../tsconfig.test.json' },
    ],
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*mock.(t|j)s, !**/*spec.(t|j)s, !**/*module.(t|j)s, !**/index.(t|j)s',
    '!instrument.ts',
    '!main.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/__test__/'],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov', 'json'],
}

module.exports = config
