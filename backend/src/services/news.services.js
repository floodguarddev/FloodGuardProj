const createHttpError = require('http-errors');
const newsRepository = require('../repositories/news.repository');
const News = require('../models/news.model');
const { default: axios } = require('axios');
const { getYesterdayDate } = require('../utils/dates');

//Delete
async function deleteNews(newsId){
    let news = await News.findByIdAndDelete(newsId).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    });
    if(!news){
        throw new createHttpError.NotFound("News with given id doesn't exist");
    }
    return news;
}
//Edit
async function editNews(newsId, newsObj){
    let news = await News.findByIdAndUpdate(newsId, newsObj, {new: true}).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })
    if(!news){
        throw new createHttpError.NotFound("News with given id doesn't exist");
    }
    return news;
}
//Add
async function addNews(title, author, description, url, imageUrl, relatedNews, relatedFloods, publishedAt, content){
    let news = await News.create({title, author, description, url, imageUrl, relatedNews, relatedFloods, publishedAt, content}).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })
    return news;
}
//View
async function getSpecificNews(id){
    let news = await newsRepository.getNewsById(id);

    if(!news)
        throw new createHttpError.NotFound("News with given id doesn't exist");

    return news;
}
//View All
async function getNews(query, limit, offset){
    let news = await newsRepository.getNewsByQuery(query, limit, offset);
    return news;
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