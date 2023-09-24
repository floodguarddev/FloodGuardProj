const multerFilesParser = require("../utils/multerFilesParser");
const newsServices = require("../services/news.services");
const { addStringQuery, addDateQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

//Delete
async function deleteNews(req, res, next){
    try{
        let newsId = req.params.newsId;
        newsServices.deleteNews(newsId);
        return res.status(200).send(messageResponse(`News with id ${newsId} has been deleted successfully.`))
    }
    catch(error)
    {
        next(error);
    }
}
//Edit
async function editNews(req, res, next){
    try{
        let newsId = req.params.newsId;
        let {title, author, description, url, relatedNews, relatedFloods, publishedAt, content} = req.body;
        let imageUrl = await multerFilesParser.getSingleFileUrl("newsImage", req.files);
        let news = await newsServices.editNews(newsId, {title, author, description,imageUrl, url, relatedNews, relatedFloods, publishedAt, content});
        res.status(200).send(dataResponse("success", {news}));
    }
    catch(error)
    {
        next(error);
    }
}
//Add
async function addNews(req, res, next){
    try{
        let {title, author, description, url, relatedNews, relatedFloods, publishedAt, content} = req.body;
        let imageUrl = await multerFilesParser.getSingleFileUrlRequired("newsImage", req.files);
        let news = await newsServices.addNews(title, author, description, url, imageUrl, relatedNews, relatedFloods, publishedAt, content);
        res.status(200).send(dataResponse("success", {news}));
    }
    catch(error)
    {
        next(error);
    }
}
//View
async function viewSpecificNews(req, res, next){
    try{
        let newsId = req.params.newsId;

        let news = await newsServices.getSpecificNews(newsId);

        return res.status(200).send(dataResponse("success", {news}))
    }
    catch(error)
    {
        next(error);
    }
}
//View All
async function viewNews(req, res, next){
    try{
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('title', mongooseQuery, query);
        addStringQuery('author', mongooseQuery, query);
        addStringQuery('description', mongooseQuery, query);
        addStringQuery('content', mongooseQuery, query);
        addDateQuery('publishedAt', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        let news = await newsServices.getNews( mongooseQuery, limit, offset);

        return res.status(200).send(dataResponse("success", {news}))
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {editNews, viewNews, viewSpecificNews, addNews, deleteNews}