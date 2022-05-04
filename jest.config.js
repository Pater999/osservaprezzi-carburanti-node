/* eslint-disable */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'json-summary'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
}
