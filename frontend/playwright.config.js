import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } }
  ],
  webServer: [
    { command: 'npm run dev', cwd: '../backend', url: 'http://127.0.0.1:8080/health', reuseExistingServer: !process.env.CI, timeout: 120000 },
    { command: 'npm run dev -- --host 127.0.0.1', cwd: '.', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI, timeout: 120000 }
  ]
});
