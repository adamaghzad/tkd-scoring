import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.ts', timeout: 30_000, workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4173/tkd-scoring/', viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173/tkd-scoring/', reuseExistingServer: !process.env.CI, timeout: 30_000 },
});
