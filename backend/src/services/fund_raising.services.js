const createHttpError = require('http-errors');
const fundRaisingRequestRepository = require('../repositories/fund_raising_request.repository');
const fundRaisingRepository = require('../repositories/fund_raising.repository');
const { getNGOById } = require('../repositories/ngo.repository');
const Fund_Raising_Post = require('../models/fund_raising_post.model');
const Fund_Raising_Post_Request = require('../models/fund_raising_post_requests.model');
const { default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/*-----------------NGO Participation Requests-----------------*/
async function postFundRaisingRequest(ngoId, postTitle, postDescription, requestedAmount, postImagesLinks){
    let ngo = await getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound(`No such a NGO with id ${ngoId}`);
    }

    let fundRaisingPostRequest = await Fund_Raising_Post_Request.create({ngoId, postTitle, postDescription, requestedAmount, postImagesLinks});

    ngo.fundRaisingPostRequests.push(fundRaisingPostRequest._id);

    await ngo.save();

    return fundRaisingPostRequest
}

async function viewSpecificFundRaisingRequestByNGO(ngoId, fundRaisingRequestId){
    console.log(ngoId, fundRaisingRequestId);
    let fundRaisingRequest = await Fund_Raising_Post_Request.findOne({ngoId, _id: fundRaisingRequestId}).populate('ngoId');

    console.log(fundRaisingRequest)

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound('Ngo Participation Request is not available');
    }

    return fundRaisingRequest
}

async function editParticipationRequestByNGO(ngoId, fundRaisingRequestId, fundRaisingRequestObj){
    let fundRaisingRequest = await Fund_Raising_Post_Request.findOneAndUpdate({ngoId, _id: fundRaisingRequestId}, fundRaisingRequestObj, {new: true}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return fundRaisingRequest;
}

async function deleteFundRaisingRequestByNGO(ngoId, fundRaisingRequestId){
    console.log(fundRaisingRequestId);
    let fundRaisingRequest = await Fund_Raising_Post_Request.findOneAndDelete({ngoId, _id: fundRaisingRequestId}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return fundRaisingRequest;
}

async function viewFundRaisingRequestsByNGO(ngoId, query, limit, offset){
    query.ngoId = new ObjectId(ngoId);

    let fundRaisingRequests = await fundRaisingRequestRepository.getRequestsByQuery(query, limit, offset);

    return fundRaisingRequests;
}

async function viewFundRaisingRequests(query, limit, offset){
    let fundRaisingRequests = await fundRaisingRequestRepository.getRequestsByQuery(query, limit, offset);

    return fundRaisingRequests;
}

async function approveFundRaisingRequest(requestId){
    let fundRaisingRequest = await Fund_Raising_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound(`There is no Fund Raising Request with given id`)
    }
    let fundRaisingObj = fundRaisingRequest.toJSON();
    delete fundRaisingObj._id;
    let fundRaising = await Fund_Raising_Post.create(fundRaisingObj).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    return fundRaising;
}

async function rejectFundRaisingRequest(requestId){
    let fundRaisingRequest = await Fund_Raising_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }
}

async function viewSpecificFundRaisingRequest(requestId){
    let fundRaisingRequest = await fundRaisingRequestRepository.getFundRaisingRequestById(requestId);

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound(`There is no NGO Participation with given id`)
    }

    return fundRaisingRequest;
}

/*-----------------NGO Participation Posts-----------------*/

async function addFundRaisingPost(ngoId, postTitle, postDescription, postImagesLinks)
{
    let ngo = await getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound(`No such a NGO with id ${ngoId}`);
    }

    let fundRaisingPost = await Fund_Raising_Post.create({ngoId, postTitle, postDescription, postImagesLinks});

    ngo.fundRaisingPosts.push(fundRaisingPost._id);

    await ngo.save();

    return fundRaisingPost
}

async function viewFundRaisingPosts(query, limit, offset){
    let fundRaisingPosts = await fundRaisingRepository.getPostsByQuery(query, limit, offset);

    return fundRaisingPosts;
}

async function viewSpecificFundRaisingPost(postId){
    let fundRaisingPost = await fundRaisingRepository.getFundRaisingById(postId);

    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return fundRaisingPost;
}

async function editFundRaisingPost(postId, fundRaisingObj){
    let fundRaisingPost = await Fund_Raising_Post.findByIdAndUpdate(postId, fundRaisingObj, {new: true}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    )
    
    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return fundRaisingPost;
}

async function deleteFundRaisingPost(postId){
    let fundRaisingPost = await Fund_Raising_Post.findByIdAndDelete(postId).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }
}

/*----NGO---*/

async function viewFundRaisingPostsByNGO(ngoId, query, limit, offset){
    query.ngoId = new ObjectId(ngoId);
    let fundRaisingPosts = await fundRaisingRepository.getPostsByQuery(query, limit, offset);

    return fundRaisingPosts;
}

async function viewSpecificFundRaisingPostByNGO(ngoId, postId){
    let fundRaisingPost = await fundRaisingRepository.getFundRaisingById(postId);

    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    if(fundRaisingPost.ngoId != ngoId){
        throw new createHttpError.NotFound(`Given NGO Participation doesn't belong to you`);
    }

    return fundRaisingPost;
}

async function editFundRaisingPostByNGO(ngoId, postId, fundRaisingObj){
    let fundRaisingPost = await Fund_Raising_Post.findOneAndUpdate({ngoId, _id: postId}, fundRaisingObj, {new: true}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    )
    
    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }

    return fundRaisingPost;
}

async function deleteFundRaisingPostByNGO(ngoId, postId){
    let fundRaisingPost = await Fund_Raising_Post.findOneAndDelete({ngoId, _id:postId}).catch(
        (error)=>{
                throw new createHttpError.InternalServerError(error);
        }
    )

    if(!fundRaisingPost){
        throw new createHttpError.NotFound(`There is no NGO Participation Post with given id`)
    }
}

/*Donations*/

async function createPaymentIntent(amount, ngoId){
    let ngo = await getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound('NGO with given id is not valid');
    }



    const paymentIntent = await stripe.paymentIntent.create({
        amount: amount,
        currency: 'usd',
        application_fee_amount: 0, 
        transfer_data: {
            destination: ngoStripeAccountID, // Transfer to the specified NGO
        }
    });

    return paymentIntent.client_secret;
}
module.exports = {
    /*NGO Paritcipation Request*/
    postFundRaisingRequest, editParticipationRequestByNGO, deleteFundRaisingRequestByNGO, viewSpecificFundRaisingRequestByNGO,
    viewFundRaisingRequestsByNGO, viewSpecificFundRaisingRequest, viewFundRaisingRequests, approveFundRaisingRequest, rejectFundRaisingRequest,

    /*NGO Participation Posts*/
    viewFundRaisingPostsByNGO, viewSpecificFundRaisingPostByNGO, editFundRaisingPostByNGO, deleteFundRaisingPostByNGO,
    addFundRaisingPost, viewFundRaisingPosts, viewSpecificFundRaisingPost, editFundRaisingPost, deleteFundRaisingPost,
}