const multerFilesParser = require("../utils/multerFilesParser");
const ngoParticipationServices = require("../services/ngo_participation.services");
const { addStringQuery, addDateQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

/*For NGO Role*/
async function postNGOParticipationRequest(req, res, next){
    try{
        let ngoId = req.ngo.id;
        const {postTitle, postDescription} = req.body;
        
        let postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let ngoParticipationRequest = await ngoParticipationServices.postNGOParticipationRequest(ngoId, postTitle, postDescription, postImagesLinks);


        return res.status(200).send({ngoParticipationRequest});
    }
    catch(error){
        next(error)
    }
}

async function deleteNGOParticipationRequestByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let ngoParticipationRequestId = req.params.ngoParticipationRequestId;

        let ngoParticipationRequest = await ngoParticipationServices.deleteParticipationRequestByNGO(ngoId, ngoParticipationRequestId)

        return res.status(200).send({ngoParticipationRequest})
    }
    catch(error){
        next(error)
    }
}

async function editNGOParticipationRequestByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let ngoParticipationRequestId = req.params.ngoParticipationRequestId;
        let ngoParticipationRequestObj = req.body;

        ngoParticipationRequestObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)


        let ngoParticipationRequest = await ngoParticipationServices.editParticipationRequestByNGO(ngoId, ngoParticipationRequestId, ngoParticipationRequestObj);

        return res.send(dataResponse("success", {ngoParticipationRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewMySpecificNGOParticipationRequest(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let ngoParticipationRequestId = req.params.ngoParticipationRequestId;

        let ngoParticipationRequest = await ngoParticipationServices.viewSpecificNGOParticipationRequestByNGO(ngoId, ngoParticipationRequestId);

        return res.status(200).send(dataResponse("success", {ngoParticipationRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewMyNGOParticipationRequests(req, res, next){
    try{
        let ngoId = req.ngo.id;

        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addDateQuery('requestedDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;

        let ngoParticipationRequests = await ngoParticipationServices.viewNGOParticipationRequestsByNGO(ngoId, query, limit, offset)
        
        return res.status(200).send(dataResponse("success", {ngoParticipationRequests}));
    
    }
    catch(error){
        return next(error);
    }
}

/*Admin*/

async function viewNGOParticipationRequests(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('postTitle', mongooseQuery, query);
        addStringQuery('postDescription', mongooseQuery, query);
        addStringQuery(['ngo', 'ngoName'], mongooseQuery, query);
        addDateQuery('requestedDate', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let ngoParticipationRequests = await ngoParticipationServices.viewNGOParticipationRequests(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {ngoParticipationRequests}));
    }
    catch(error){
        next(error)
    }
}

async function approveNGOParticipationRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let ngoParticipation = await ngoParticipationServices.approveNGOParticipationRequest(requestId);

        return res.send(messageResponse("success", "NGO Participation request has been approved"));
    }
    catch(error){
        next(error);
    }
}

async function rejectNGOParticipationRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        await ngoParticipationServices.rejectNGOParticipationRequest(requestId);

        return res.send(messageResponse("successs", "NGO Participation request has been deleted"));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificNGOParticipationRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let ngoParticipationRequest = await ngoParticipationServices.viewSpecificNGOParticipationRequest(requestId);
        
        return res.send(dataResponse("success", {ngoParticipationRequest}));
    }
    catch(error){
        next(error);
    }
}

async function addNGOParticipationPost(req, res, next){
    try{
        let ngoId = req.params.ngoId;
        const {postTitle, postDescription} = req.body;
        
        let postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let ngoParticipationPost = await ngoParticipationServices.addNGOParticipationPost(ngoId, postTitle, postDescription, postImagesLinks);


        return res.status(200).send(dataResponse("success", {ngoParticipationPost}));
    }
    catch(error){
        next(error)
    }
}

async function viewNGOParticipationPosts(req, res, next){
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
        
        let ngoParticipationPosts = await ngoParticipationServices.viewNGOParticipationPosts(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {ngoParticipationPosts}));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificNGOParticipationPost(req, res, next){
    try{
        let postId = req.params.postId;

        let ngoParticipationPost = await ngoParticipationServices.viewSpecificNGOParticipationPost(postId);
        
        return res.send(dataResponse("success", {ngoParticipationPost}));
    }
    catch(error){
        next(error);
    }
}

async function editNGOParticipationPost(req, res, next){
    try{
        let postId = req.params.postId;
        const ngoParticipationObj = req.body;
        
        ngoParticipationObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let ngoParticipationPost = await ngoParticipationServices.editNGOParticipationPost(postId, ngoParticipationObj);


        return res.status(200).send(dataResponse("success", {ngoParticipationPost}));
    }
    catch(error){
        next(error);
    }
}

async function deleteNGOParticipationPost(req, res, next){
    try{
        let postId = req.params.postId;

        await ngoParticipationServices.deleteNGOParticipationPost(postId);

        return res.status(200).send(messageResponse("successs", "NGO Participation post has been deleted successfully."));
    }
    catch(error){
        next(error);
    }
}


async function viewNGOParticipationPostsByNGO(req, res, next){
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
        
        let ngoParticipationPosts = await ngoParticipationServices.viewNGOParticipationPostsByNGO(ngoId, mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {ngoParticipationPosts}));
    }
    catch(error){
        next(error);
    }
}

async function viewSpecificNGOParticipationPostByNGO(req, res, next){
    try{
        let postId = req.params.postId;
        let ngoId = req.ngo.id;
        let ngoParticipationPost = await ngoParticipationServices.viewSpecificNGOParticipationPostByNGO(ngoId, postId);
        
        return res.send(dataResponse("success", {ngoParticipationPost}));
    }
    catch(error){
        next(error);
    }
}

async function editNGOParticipationPostByNGO(req, res, next){
    try{
        let postId = req.params.postId;
        let ngoId = req.ngo.id;
        const ngoParticipationObj = req.body;
        
        ngoParticipationObj.postImagesLinks = await multerFilesParser.getMultipleFilesUrls("postImages", req.files)

        let ngoParticipationPost = await ngoParticipationServices.editNGOParticipationPostByNGO(ngoId, postId, ngoParticipationObj);


        return res.status(200).send(dataResponse("success", {ngoParticipationPost}));
    }
    catch(error){
        next(error);
    }
}

async function deleteNGOParticipationPostByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;
        let postId = req.params.postId;

        await ngoParticipationServices.deleteNGOParticipationPostByNGO(ngoId, postId);

        return res.status(200).send(messageResponse("successs", "NGO Participation post has been deleted successfully."));
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    /*NGO Participation Request*/
    /*For NGO*/
    postNGOParticipationRequest, deleteNGOParticipationRequestByNGO, editNGOParticipationRequestByNGO,
    viewMySpecificNGOParticipationRequest, viewMyNGOParticipationRequests, 
    /*For Admin*/
    approveNGOParticipationRequest, rejectNGOParticipationRequest, viewSpecificNGOParticipationRequest,
    viewNGOParticipationRequests,

    /*NGO Participation Posts*/
    viewNGOParticipationPostsByNGO, viewSpecificNGOParticipationPostByNGO, editNGOParticipationPostByNGO, deleteNGOParticipationPostByNGO,

    addNGOParticipationPost, viewNGOParticipationPosts, viewSpecificNGOParticipationPost, editNGOParticipationPost, deleteNGOParticipationPost,

}