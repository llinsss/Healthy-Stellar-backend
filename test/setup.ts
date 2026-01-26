import { customMatchers } from './utils/custom-matchers';

// Register custom matchers
expect.extend(customMatchers);

// Mock uuid for deterministic tests
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-1234-5678-9012'),
}));

// Set test timeout for longer operations
jest.setTimeout(30000);

// Global test setup
beforeAll(() => {
  // Suppress console logs in tests unless debugging
  if (process.env.DEBUG !== 'true') {
    global.console = {
      ...console,
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };
  }
});

