let Fund_Raising_Post = require('./../models/fund_raising_post.model');
const createHttpError = require('http-errors');


async function getPostsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let fundRaisingPosts = await Fund_Raising_Post.aggregate(
        [
            { $lookup: { from:"ngos", localField:'ngoId', foreignField:"_id" , as : 'ngo' } },
            { $unwind: "$ngo" },
            { $match: query},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );


    fundRaisingPosts = fundRaisingPosts.map(
        (obj)=>{
            let newObj = {...obj, ngoName: obj.ngo.ngoName, ngoImageLink: obj.ngo.ngoImageLink};
            delete newObj.ngo;
            return newObj;
        }
    );

    return fundRaisingPosts;
}

async function getFundRaisingById(id){
    let fundRaisingPost = await Fund_Raising_Post.findById(id).populate('ngoId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    if(!fundRaisingPost)
        throw new createHttpError.NotFound("Fundraising Post with given id doesn't exists");

    fundRaisingPost = {...fundRaisingPost.toJSON(), ngoName: fundRaisingPost.ngoId.ngoName, ngoImageLink: fundRaisingPost.ngoId.ngoImageLink, ngoId: fundRaisingPost.ngoId._id};
    return fundRaisingPost;
}

async function deleteFundRaisingById(requestId){
    let fundRaisingRequest = await Fund_Raising_Post.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    return fundRaisingRequest;
}

module.exports = {getPostsByQuery, getFundRaisingById, deleteFundRaisingById}