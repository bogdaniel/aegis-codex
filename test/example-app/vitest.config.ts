import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Vitest config with path alias support
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@identity/domain': resolve(__dirname, './IdentityContext/Domain'),
      '@identity/app': resolve(__dirname, './IdentityContext/Application'),
      '@identity/infra': resolve(__dirname, './IdentityContext/Infrastructure'),
      '@identity/interface': resolve(__dirname, './IdentityContext/Interface'),
      '@orders/domain': resolve(__dirname, './OrdersContext/Domain'),
      '@orders/app': resolve(__dirname, './OrdersContext/Application'),
      '@orders/infra': resolve(__dirname, './OrdersContext/Infrastructure'),
      '@orders/interface': resolve(__dirname, './OrdersContext/Interface'),
    },
  },
});

