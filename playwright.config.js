const { devices } = require('@playwright/test');

module.exports = {
    testDir: './tests',

    reporter: [
      ['list'],
      ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ],

    use: {
      baseURL: 'https://practicesoftwaretesting.com',
      headless: true,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 15000,
      ignoreHTTPSErrors: true,
      video: 'on',
      screenshot: 'on',
      trace: 'on',
    },

    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      /*
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
      */
    ],
    outputDir: 'test-results/',
};
