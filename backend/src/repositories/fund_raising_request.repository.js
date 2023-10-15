let Fund_Raising_Post_Request = require('./../models/fund_raising_post_requests.model');
const createHttpError = require('http-errors');


async function getRequestsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let fundRaisingRequests = await Fund_Raising_Post_Request.aggregate(
        [
            { $lookup: { from:"ngos", localField:'ngoId', foreignField:"_id" , as : 'ngo' } },
            { $unwind: "$ngo" },
            { $match: query},
            {$sort: {requestDate : -1}},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );


    fundRaisingRequests = fundRaisingRequests.map(
        (obj)=>{
            let newObj = {...obj, ngoName: obj.ngo.ngoName, ngoImageLink: obj.ngo.ngoImageLink};
            delete newObj.ngo;
            return newObj;
        }
    );
    const total = await Fund_Raising_Post_Request.countDocuments(query);
    return {total, fundRaisingRequests};
}

async function getFundRaisingRequestById(id){
    let fundRaisingRequest = await Fund_Raising_Post_Request.findById(id).populate('ngoId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    fundRaisingRequest = {...fundRaisingRequest.toJSON(), ngoName: fundRaisingRequest.ngoId.ngoName, ngoImageLink: fundRaisingRequest.ngoId.ngoImageLink, ngoId: fundRaisingRequest.ngoId._id};
    return fundRaisingRequest;
}

async function deleteFundRaisingRequestById(requestId){
    let fundRaisingRequest = await Fund_Raising_Post_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!fundRaisingRequest){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    return fundRaisingRequest;
}

module.exports = {getRequestsByQuery, getFundRaisingRequestById, deleteFundRaisingRequestById}