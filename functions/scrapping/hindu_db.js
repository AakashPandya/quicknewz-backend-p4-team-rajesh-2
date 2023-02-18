const playwright = require("playwright");
// const mongoose = require('mongoose');
const { headlinesModel } = require("./model");
const dbConnection = require("./connection");

const hinduURL = "https://www.thehindu.com/news/national/";

// var newsdetails;

async function hinduScrap() {
  const dbinsert = [];
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

  newscont.forEach((newc) => {
    const img_src = newc.img_src;
    const title_txt = newc.title_txt;
    const newsItem = newc.newsItemUrl;
    const newsProvider = "HINDU";
    dbinsert.push({
      title: title_txt,
      link: newsItem,
      imageLink: img_src,
      provider: newsProvider,
    });
  });

  dbConnection();

  await headlinesModel
    .insertMany(dbinsert)
    .then(() => console.log("Hindu headlines inserted"))
    .catch((err) => console.log("error while inserting headlines", err));

  await browser.close();
  // return newscont;
}

hinduScrap();
