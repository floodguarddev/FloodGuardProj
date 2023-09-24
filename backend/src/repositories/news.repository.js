let News = require('./../models/news.model');
const createHttpError = require('http-errors');

async function getNewsByQuery(query, limit, offset){
    let news = await News.find(query)
    .skip(offset)
    .limit(limit);

    return news;
}

async function getNewsById(id){
    let news = await News.findById(id).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    });

    return news;
}
module.exports = {getNewsByQuery, getNewsById}