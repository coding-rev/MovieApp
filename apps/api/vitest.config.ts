import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    testTimeout: 20000, // 20 seconds for all tests
    hookTimeout: 10000, // for beforeAll/afterAll hooks
  },
});
