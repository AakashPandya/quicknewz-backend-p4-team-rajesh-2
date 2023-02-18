const playwright = require("playwright");
// const mongoose = require('mongoose');
const {headlinesModel } = require("./model");

const dbConnection = require('./connection');
const news18URL = 'https://www.news18.com/news/';

async function news18Scrap() {
    const dbinsert = [];
    const browser = await playwright.chromium.launch({headless:true});
    const page = await browser.newPage();
    await page.goto(news18URL);
    const newsCont = await page.$$eval(
        '.blog_list_row', allNews => {
            const data = [];
            let [img_src, title_txt, newsItemURL] = '';
            allNews.forEach( news => {
                if(news!==null){
                const img = news.querySelector('.blog_img')
                if(img!==null) {    
                img_src = img.querySelector('img').src;
                title_txt = img.querySelector('img').title; }
                newsItemURL = news.querySelector('a').href;
                data.push({img_src, title_txt, newsItemURL});  
            }
        });
        return data;
        });
    console.log(newsCont);

     newsCont.forEach( newc => {
        const img_src = newc.img_src;
        const title_txt = newc.title_txt;
        const newsItem = newc.newsItemUrl;
        const newsProvider = 'NEWS18';
        dbinsert.push({
            title: title_txt,
            link: newsItem,
            imageLink: img_src,
            provider: newsProvider
        });
     });

    dbConnection();

    await headlinesModel.insertMany( dbinsert
        ).then( () => console.log('News 18 headlines inserted')
        ).catch ( (err) => console.log('error while inserting headlines', err));

    await browser.close();
}


news18Scrap();