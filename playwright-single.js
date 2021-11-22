const expect = require('chai').expect
const { chromium } = require('playwright');

(async () => {
  const capabilities = {
    'browserName': 'chrome',
    'version': 'latest',
    'platform': 'MacOS Catalina',
    'build': 'Playwright Sample Build',
    'name': 'Playwright Sample Test',
    'username': '<your user name>',
    'access_key': '<your access key>',
  };

  const browser = await chromium.connectOverCDP({
    endpointURL: `wss://stage-cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
  });

  const page = await browser.newPage();

  await page.goto('https://www.bing.com');

  const element = await page.$('[aria-label="Enter your search term"]');
  await element.click();
  await element.type('LambdaTest');
  await element.press('Enter');
  const title = await page.title();

  expect(title).to.equal("LambdaTest - Search", 'Incorrect title!');

  await browser.close();
})();
