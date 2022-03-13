const puppeteer = require('puppeteer');

(async function App() {
  const browser = await puppeteer.launch({
    // product: 'firefox',
    headless: false,
    slowMo: true,
  });
  const page = await browser.newPage();

  await page.goto('https://google.com');

  page.waitForSelector('input.gLFyf.gsfi');

  const search = await page.$('input.gLFyf.gsfi');
  const element = await page.$('input.gNO89b');
  // const element = await page.$$('input.gNO89b');
  // console.log(element.asElement());

  // const element = await page.$eval('input.gNO89b', (el) => el.name);

  // const container = await page.$('div.FPdoLc.lJ9FBc');
  // const element = await container.$eval('input.gNO89b', el => el.name);
  // console.log(element);

  await search.type('hello world', { delay: 100 });

  // await search.press('Enter');
  await element.click();

  await page.screenshot({
    path: './home.png',
    type: 'png',
    // quality: 100,
    fullPage: true,
  });

  await browser.close();
})();
