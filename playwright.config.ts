import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.API_ORIGIN,
  },
  testDir: './src/e2e',
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'googlechrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
