/* eslint-disable @typescript-eslint/no-require-imports */

const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
