const createHttpError = require('http-errors');
const ngoParticipationRequestRepository = require('../repositories/ngo_participation_request.repository');
const ngoParticipationRepository = require('../repositories/ngo_participation.repository');
const { getNGOById } = require('../repositories/ngo.repository');
const NGO_Participation_Post = require('../models/ngo_participation_post.model');
const NGO_Participation_Post_Request = require('../models/ngo_participation_post_requests.model');
const { default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const notificationServices = require('../services/notifications.services');

/*-----------------NGO Participation Requests-----------------*/
async function postNGOParticipationRequest(ngoId, postTitle, postDescription, postImagesLinks){
    let ngo = await getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound(`No such a NGO with id ${ngoId}`);
    }

    let ngoParticipationPostRequest = await NGO_Participation_Post_Request.create({ngoId, postTitle, postDescription, postImagesLinks});

    ngo.ngoParticipationPostRequests.push(ngoParticipationPostRequest._id);

    await ngo.save();

    await notificationServices.createUserNotificationToAdmin(ngo.ngoName, ngo.ngoImageLink,"NGO Participation Request","/ngos/request");

    return ngoParticipationPostRequest
}

async function viewSpecificNGOParticipationRequestByNGO(ngoId, ngoParticipationRequestId){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findOne({ngoId, _id: ngoParticipationRequestId}).populate('ngoId');

    

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound('Ngo Participation Request is not available');
    }

    return ngoParticipationRequest
}

async function editParticipationRequestByNGO(ngoId, ngoParticipationRequestId, ngoParticipationRequestObj){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findOneAndUpdate({ngoId, _id: ngoParticipationRequestId}, ngoParticipationRequestObj, {new: true}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return ngoParticipationRequest;
}

async function deleteParticipationRequestByNGO(ngoId, ngoParticipationRequestId){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findOneAndDelete({ngoId, _id: ngoParticipationRequestId}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return ngoParticipationRequest;
}

async function viewNGOParticipationRequestsByNGO(ngoId, query, limit, offset){
    query.ngoId = new ObjectId(ngoId);

    let ngoParticipationRequests = await ngoParticipationRequestRepository.getRequestsByQuery(query, limit, offset);

    return ngoParticipationRequests;
}

async function viewNGOParticipationRequests(query, limit, offset){
    let ngoParticipationRequests = await ngoParticipationRequestRepository.getRequestsByQuery(query, limit, offset);

    return ngoParticipationRequests;
}

async function approveNGOParticipationRequest(requestId){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation Request with given id`)
    }
    let ngoParticipationObj = ngoParticipationRequest.toJSON();
    delete ngoParticipationObj._id;
    let ngoParticipation = await NGO_Participation_Post.create(ngoParticipationObj).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    return ngoParticipation;
}

async function rejectNGOParticipationRequest(requestId){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }
}

async function viewSpecificNGOParticipationRequest(requestId){
    let ngoParticipationRequest = await ngoParticipationRequestRepository.getNGOParticipationRequestById(requestId);

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return ngoParticipationRequest;
}

/*-----------------NGO Participation Posts-----------------*/

async function addNGOParticipationPost(ngoId, postTitle, postDescription, postImagesLinks)
{
    let ngo = await getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound(`No such a NGO with id ${ngoId}`);
    }

    let ngoParticipationPost = await NGO_Participation_Post.create({ngoId, postTitle, postDescription, postImagesLinks});

    ngo.ngoParticipationPosts.push(ngoParticipationPost._id);

    await ngo.save();

    return ngoParticipationPost
}

async function viewNGOParticipationPosts(query, limit, offset){
    let ngoParticipationPosts = await ngoParticipationRepository.getPostsByQuery(query, limit, offset);

    return ngoParticipationPosts;
}

async function viewSpecificNGOParticipationPost(postId){
    let ngoParticipationPost = await ngoParticipationRepository.getNGOParticipationById(postId);

    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return ngoParticipationPost;
}

async function editNGOParticipationPost(postId, ngoParticipationObj){
    let ngoParticipationPost = await NGO_Participation_Post.findByIdAndUpdate(postId, ngoParticipationObj, {new: true}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    )
    
    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return ngoParticipationPost;
}

async function deleteNGOParticipationPost(postId){
    let ngoParticipationPost = await NGO_Participation_Post.findByIdAndDelete(postId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }
}

/*----NGO---*/

async function viewNGOParticipationPostsByNGO(ngoId, query, limit, offset){
    query.ngoId = new ObjectId(ngoId);;
    let ngoParticipationPosts = await ngoParticipationRepository.getPostsByQuery(query, limit, offset);

    return ngoParticipationPosts;
}

async function viewSpecificNGOParticipationPostByNGO(ngoId, postId){
    let ngoParticipationPost = await ngoParticipationRepository.getNGOParticipationById(postId);

    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    if(ngoParticipationPost.ngoId != ngoId){
        throw new createHttpError.NotFound(`Given NGO Participation doesn't belong to you`);
    }

    return ngoParticipationPost;
}

async function editNGOParticipationPostByNGO(ngoId, postId, ngoParticipationObj){
    let ngoParticipationPost = await NGO_Participation_Post.findOneAndUpdate({ngoId, _id: postId}, ngoParticipationObj, {new: true}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    )
    
    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return ngoParticipationPost;
}

async function deleteNGOParticipationPostByNGO(ngoId, postId){
    let ngoParticipationPost = await NGO_Participation_Post.findOneAndDelete({ngoId, _id:postId}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!ngoParticipationPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }
}


module.exports = {
    /*NGO Paritcipation Request*/
    postNGOParticipationRequest, editParticipationRequestByNGO, deleteParticipationRequestByNGO, viewSpecificNGOParticipationRequestByNGO,
    viewNGOParticipationRequestsByNGO, viewSpecificNGOParticipationRequest, viewNGOParticipationRequests, approveNGOParticipationRequest, rejectNGOParticipationRequest,

    /*NGO Participation Posts*/
    viewNGOParticipationPostsByNGO, viewSpecificNGOParticipationPostByNGO, editNGOParticipationPostByNGO, deleteNGOParticipationPostByNGO,
    addNGOParticipationPost, viewNGOParticipationPosts, viewSpecificNGOParticipationPost, editNGOParticipationPost, deleteNGOParticipationPost,
}