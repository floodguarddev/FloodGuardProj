let NGO_Participation_Post_Request = require('./../models/ngo_participation_post_requests.model');
const createHttpError = require('http-errors');


async function getRequestsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngoParticipationRequests = await NGO_Participation_Post_Request.aggregate(
        [
            { $lookup: { from:"ngos", localField:'ngoId', foreignField:"_id" , as : 'ngo' } },
            { $unwind: "$ngo" },
            { $match: query},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );

    ngoParticipationRequests = ngoParticipationRequests.map(
        (obj)=>{
            let newObj = {...obj, ngoName: obj.ngo.ngoName, ngoImageLink: obj.ngo.ngoImageLink, ngoId: obj.ngo._id};
            delete newObj.ngo
            return newObj;
        }
    );

    return ngoParticipationRequests;
}

async function getNGOParticipationRequestById(id){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findById(id).populate('ngoId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    ngoParticipationRequest = {...ngoParticipationRequest.toJSON(), ngoName: ngoParticipationRequest.ngoId.ngoName, ngoImageLink: ngoParticipationRequest.ngoId.ngoImageLink, ngoId: ngoParticipationRequest.ngoId._id};
    return ngoParticipationRequest;
}

async function deleteNGOParticipationRequestById(requestId){
    let ngoParticipationRequest = await NGO_Participation_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!ngoParticipationRequest){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    return ngoParticipationRequest;
}

module.exports = {getRequestsByQuery, getNGOParticipationRequestById, deleteNGOParticipationRequestById}