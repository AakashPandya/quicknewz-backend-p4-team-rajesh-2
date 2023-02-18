const playwright = require("playwright");

const ndtvURL = "https://www.ndtv.com/top-stories#pfrom=home-ndtv_topstories";

async function ndtvScrap() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  // await page.goto(ndtvURL, { waitUntil: 'load' });
  await page.goto(ndtvURL, { timeout: 800000 });
  const newsCont = await page.$$eval(".news_Itm", (allNews) => {
    const data = [];
    let [img_src, title_txt, newsItemURL] = "";
    allNews.forEach((news) => {
      if (news !== null) {
        const img = news.querySelector(".news_Itm-img");
        // const img_src = img?.src;
        if (img !== null) {
          img_src = img.querySelector("img").src;
        }
        const title = news.querySelector(".news_Itm-cont");
        if (title !== null) {
          title_txt = title.querySelector("h2").innerText;
        }
        const newsItem = news.querySelector(".news_Itm-cont");
        if (newsItem !== null) {
          newsItemURL = newsItem.querySelector("a").href;
        }
        data.push({ img_src, title_txt, newsItemURL });
      }
    });
    return data;
  });
  let newsUniq = distinct(newsCont, ["title_txt", "newsItemURL"]);
  await browser.close();
}

ndtvScrap();

const distinct = (arr, indexedKeys, isPrioritizeFormer = true) => {
  const lookup = new Map();
  const makeIndex = (el) =>
    indexedKeys.reduce((index, key) => `${index};;${el[key]}`, "");
  arr.forEach((el) => {
    const index = makeIndex(el);
    if (lookup.has(index) && isPrioritizeFormer) {
      return;
    }
    lookup.set(index, el);
  });

  return Array.from(lookup.values());
};
