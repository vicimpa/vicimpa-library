import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' for browser-like environments
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test).ts'],
  transform: {
    ...tsJestTransformCfg,
  },
};
