let NGO_Participation_Post = require('./../models/ngo_participation_post.model');
const createHttpError = require('http-errors');


async function getPostsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngoParticipationPosts = await NGO_Participation_Post.aggregate(
        [
            { $lookup: { from:"ngos", localField:'ngoId', foreignField:"_id" , as : 'ngo' } },
            { $unwind: "$ngo" },
            { $match: query},
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

    return ngoParticipationPosts;
}

async function getNGOParticipationById(id){
    let ngoParticipationRequest = await NGO_Participation_Post.findById(id).populate('ngoId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    ngoParticipationRequest = {...ngoParticipationRequest.toJSON(), ngoName: ngoParticipationRequest.ngoId.ngoName, ngoImageLink: ngoParticipationRequest.ngoId.ngoImageLink, ngoId: ngoParticipationRequest.ngoId._id};
    return ngoParticipationRequest;
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