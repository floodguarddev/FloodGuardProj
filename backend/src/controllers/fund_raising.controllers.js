const multerFilesParser = require("../utils/multerFilesParser");
const fundRaisingServices = require("../services/fund_raising.services");
const { addStringQuery, addDateQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

/*For NGO Role*/
async function postFundRaisingRequest(req, res, next){
    try{
        let ngoId = req.ngo.id;
        const {postTitle, postDescription, requestedAmount} = req.body;
        
        let postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let fundRaisingRequest = await fundRaisingServices.postFundRaisingRequest(ngoId, postTitle, postDescription, requestedAmount, postImagesLinks);


        return res.status(200).send({fundRaisingRequest});
    }
    catch(error){
        next(error)
    }
}

async function deleteFundRaisingRequestByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let fundRaisingRequestId = req.params.requestId;

        let fundRaisingRequest = await fundRaisingServices.deleteFundRaisingRequestByNGO(ngoId, fundRaisingRequestId)

        return res.status(200).send(messageResponse("success", "Fund Raising Post has been deleted successfully"));
    }
    catch(error){
        next(error)
    }
}

async function editFundRaisingRequestByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let fundRaisingRequestId = req.params.requestId;
        let fundRaisingRequestObj = req.body;

        fundRaisingRequestObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)


        let fundRaisingRequest = await fundRaisingServices.editParticipationRequestByNGO(ngoId, fundRaisingRequestId, fundRaisingRequestObj);

        return res.send(dataResponse("success", {fundRaisingRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewMySpecificFundRaisingRequest(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let fundRaisingRequestId = req.params.requestId;

        let fundRaisingRequest = await fundRaisingServices.viewSpecificFundRaisingRequestByNGO(ngoId, fundRaisingRequestId);

        return res.status(200).send(dataResponse("success", {fundRaisingRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewMyFundRaisingRequests(req, res, next){
    try{
        let ngoId = req.ngo.id;

        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addDateQuery('requestDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;

        let fundRaisingRequests = await fundRaisingServices.viewFundRaisingRequestsByNGO(ngoId, query, limit, offset)
        
        return res.status(200).send(dataResponse("success", {...fundRaisingRequests}));
    
    }
    catch(error){
        return next(error);
    }
}

/*Admin*/

async function viewFundRaisingRequests(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addStringQuery(['ngo', 'ngoName'], mongooseQuery, query)
        addDateQuery('requestedDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let fundRaisingRequests = await fundRaisingServices.viewFundRaisingRequests(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {...fundRaisingRequests}));
    }
    catch(error){
        next(error)
    }
}

async function approveFundRaisingRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let fundRaising = await fundRaisingServices.approveFundRaisingRequest(requestId);

        return res.send(messageResponse("success", "Fund raising request has been approved successfully"));
    }
    catch(error){
        next(error);
    }
}

async function rejectFundRaisingRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        await fundRaisingServices.rejectFundRaisingRequest(requestId);

        return res.send(messageResponse("success", "Fund raising request has been deleted"));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificFundRaisingRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let fundRaisingRequest = await fundRaisingServices.viewSpecificFundRaisingRequest(requestId);
        
        return res.send(dataResponse("success", {fundRaisingRequest}));
    }
    catch(error){
        next(error);
    }
}

async function addFundRaisingPost(req, res, next){
    try{
        let ngoId = req.params.ngoId;
        const {postTitle, postDescription, requestedAmount} = req.body;
        
        let postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let fundRaisingPost = await fundRaisingServices.addFundRaisingPost(ngoId, postTitle, postDescription, requestedAmount, postImagesLinks);


        return res.status(200).send(dataResponse("success", {fundRaisingPost}));
    }
    catch(error){
        next(error)
    }
}

async function viewFundRaisingPosts(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addStringQuery(['ngo', 'ngoName'], mongooseQuery, query);
        addDateQuery('postedDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let fundRaisingPosts = await fundRaisingServices.viewFundRaisingPosts(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {...fundRaisingPosts}));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificFundRaisingPost(req, res, next){
    try{
        let postId = req.params.postId;

        let fundRaisingPost = await fundRaisingServices.viewSpecificFundRaisingPost(postId);
        
        return res.send(dataResponse("success", {fundRaisingPost}));
    }
    catch(error){
        next(error);
    }
}

async function editFundRaisingPost(req, res, next){
    try{
        let postId = req.params.postId;
        const fundRaisingObj = req.body;
        
        fundRaisingObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let fundRaisingPost = await fundRaisingServices.editFundRaisingPost(postId, fundRaisingObj);


        return res.status(200).send(dataResponse("success", {fundRaisingPost}));
    }
    catch(error){
        next(error);
    }
}

async function deleteFundRaisingPost(req, res, next){
    try{
        let postId = req.params.postId;

        await fundRaisingServices.deleteFundRaisingPost(postId);

        return res.status(200).send(messageResponse("NGO Participation post has been deleted successfully."));
    }
    catch(error){
        next(error);
    }
}


async function viewFundRaisingPostsByNGO(req, res, next){
    try{
        //Filtering//
        let ngoId = req.ngo.id;
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addDateQuery('postedDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let fundRaisingPosts = await fundRaisingServices.viewFundRaisingPostsByNGO(ngoId, mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {...fundRaisingPosts}));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificFundRaisingPostByNGO(req, res, next){
    try{
        let postId = req.params.postId;
        let ngoId = req.ngo.id;
        let fundRaisingPost = await fundRaisingServices.viewSpecificFundRaisingPostByNGO(ngoId, postId);
        
        return res.send(dataResponse("success", {fundRaisingPost}));
    }
    catch(error){
        next(error);
    }
}

async function editFundRaisingPostByNGO(req, res, next){
    try{
        let postId = req.params.postId;
        let ngoId = req.ngo.id;
        const fundRaisingObj = req.body;
        
        fundRaisingObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let fundRaisingPost = await fundRaisingServices.editFundRaisingPostByNGO(ngoId, postId, fundRaisingObj);


        return res.status(200).send(dataResponse("success", {fundRaisingPost}));
    }
    catch(error){
        next(error);
    }
}

async function deleteFundRaisingPostByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let postId = req.params.postId;

        await fundRaisingServices.deleteFundRaisingPostByNGO(ngoId, postId);

        return res.status(200).send(messageResponse("NGO Participation post has been deleted successfully."));
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    /*NGO Participation Request*/
    /*For NGO*/
    postFundRaisingRequest, deleteFundRaisingRequestByNGO, editFundRaisingRequestByNGO,
    viewMySpecificFundRaisingRequest, viewMyFundRaisingRequests, 
    /*For Admin*/
    approveFundRaisingRequest, rejectFundRaisingRequest, viewSpecificFundRaisingRequest,
    viewFundRaisingRequests,

    /*NGO Participation Posts*/
    viewFundRaisingPostsByNGO, viewSpecificFundRaisingPostByNGO, editFundRaisingPostByNGO, deleteFundRaisingPostByNGO,

    addFundRaisingPost, viewFundRaisingPosts, viewSpecificFundRaisingPost, editFundRaisingPost, deleteFundRaisingPost,

}