const playwright = require("playwright");

const ndtvURL =
  "https://www.ndtv.com/karnataka-news/will-win-even-if-pm-modi-amit-shah-campaign-against-me-congresss-siddaramaiah-3712108";

async function ndtvScrapDetails(url) {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  // await page.goto(url, { waitUntil: 'load' });
  await page.goto(url, { timeout: 800000 });

  const place = await page.$eval(
    "ins_instory_dv .place_cont",
    (el) => el.value
  );
  console.log(place);
  const paragraph = await page.$$eval("ins_instory_body > p");
}

ndtvScrapDetails(ndtvURL);
