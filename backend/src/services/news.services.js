const createHttpError = require('http-errors');
const newsRepository = require('../repositories/news.repository');
const News = require('../models/news.model');
const { default: axios } = require('axios');
const moment = require('moment');
const { getYesterdayDate } = require('../utils/dates');

//Delete
async function deleteNews(newsId){

}
//Edit
async function editNews(newsId, newsObj){
    
}
//Add
async function addNews(title, author, description, url, imageUrl, publishedAt, content){

}
//View
async function getSpecificNews(id){

}
//View All
async function getNews(query, limit, offset){

}

//Add Bulk News
async function addScheduledNews(){
    let queryDate = getYesterdayDate();

    let news = await axios.get(`https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}&q=floods in pakistan&language=en&from=${queryDate}`);
    let articles = await news.data.articles;
    articles = articles.map((newsObj)=>{
        let processedObj = {
            author: newsObj.author,
            title: newsObj.title,
            description: newsObj.description,
            url: newsObj.url,
            imageUrl: newsObj.urlToImage,
            publishedAt: new Date(newsObj.publishedAt),
            content: newsObj.content
        };
        return processedObj
    });
    
    let processedArticles = articles.filter((article)=> {
        if(article.author && article.imageUrl && article.title && article.description
             && article.title != '[Removed]' &&  article.description != '[Removed]')
             return true;
        return false
    })

    let result = await News.insertMany(processedArticles).catch((error)=>{
        console.log(error.message);
    })

    return result;
    
}

module.exports = {getNews, addNews, editNews,deleteNews,getSpecificNews, addScheduledNews}