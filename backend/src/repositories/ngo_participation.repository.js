let NGO_Participation_Post = require('./../models/ngo_participation_post.model');
const createHttpError = require('http-errors');


async function getPostsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngoParticipationPosts = await NGO_Participation_Post.aggregate(
        [
            { $lookup: { from:"ngos", localField:'ngoId', foreignField:"_id" , as : 'ngo' } },
            { $unwind: "$ngo" },
            { $match: query},
            { $sort: {postedDate: -1}},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );


    ngoParticipationPosts = ngoParticipationPosts.map(
        (obj)=>{
            let newObj = {...obj, ngoName: obj.ngo.ngoName, ngoImageLink: obj.ngo.ngoImageLink, ngoId: obj.ngo._id};
            delete newObj.ngo
            return newObj;
        }
    );

    const total = await NGO_Participation_Post.countDocuments(query);

    return {total, ngoParticipationPosts};
}

async function getNGOParticipationById(id){
    let ngoParticipationPost = await NGO_Participation_Post.findById(id).populate('ngoId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    if(!ngoParticipationPost){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    ngoParticipationPost = {...ngoParticipationPost.toJSON(), ngoName: ngoParticipationPost.ngoId.ngoName, ngoImageLink: ngoParticipationPost.ngoId.ngoImageLink, ngoId: ngoParticipationPost.ngoId._id};
    return ngoParticipationPost;
}

async function deleteNGOParticipationById(requestId){
    let ngoParticipationRequest = await NGO_Participation_Post.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    return ngoParticipationRequest;
}

module.exports = {getPostsByQuery, getNGOParticipationById, deleteNGOParticipationById}