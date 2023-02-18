const playwright = require("playwright");

const hinduURL = "https://www.thehindu.com/news/national/";

// var newsdetails;

async function hinduScrap() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(hinduURL);
  const newscont = await page.$$eval(".element.row-element", (allNews) => {
    const data = [];
    let [img_src, title_txt, newsItemURL] = "";
    allNews.forEach((news) => {
      if (news !== null) {
        const img = news.querySelector(".element.row-element .picture");
        if (img !== null) {
          img_src = img.querySelector("img")?.src;
        }
        const title = news.querySelector(".right-content");
        if (title !== null) {
          title_txt = title.querySelector("a").text;
          newsItemURL = title.querySelector("a").href;
        }
        data.push({ img_src, title_txt, newsItemURL });
      }
    });
    return data;
  });

  await browser.close();
  return newscont;
}

hinduScrap();
