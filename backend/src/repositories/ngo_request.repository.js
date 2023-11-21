const createHttpError = require('http-errors');
const NGO_Request = require('../models/ngo_request.model');


async function validityOfNGORequest(userId, cnicNumber, ngoName, ngoContactNumber, ngoId){
    let ngoRequest = await NGO_Request.findOne({$or: [
        {userId: userId},
        {cnicNumber: cnicNumber},
        {ngoName: ngoName},
        {ngoContactNumber: ngoContactNumber},
        {ngoId: ngoId}
    ]})

    if(!ngoRequest)
        return; //There is no Request, so It is valid
    
    if(ngoRequest.userId == userId){
        throw new createHttpError.Conflict("NGO Request with given userId already Exists");
    }
    else if(ngoRequest.cnicNumber == cnicNumber){
        throw new createHttpError.Conflict("NGO Request with given cnic number already exists");
    }
    else if(ngoRequest.ngoContactNumber == ngoContactNumber){
        throw new createHttpError.Conflict("NGO Request with given Ngo contact number already exists");
    }
    else if(ngoRequest.ngoName == ngoName){
        throw new createHttpError.Conflict("Ngo request with given NGO name is already available");
    }
    else if(ngoRequest.ngoId == ngoId){
        throw new createHttpError.Conflict("Ngo request with given NGO id is already available");
    }
}

async function getRequestsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngoRequests = await NGO_Request.find(query)
    .select({
        address: 1,
        ngoImageLink: 1,
        ngoName: 1,
        ngoContactNumber: 1,
        ngoId: 1
    })
    .sort({registrationDate: -1})
    .skip(offset)
    .limit(limit);
    const total = await NGO_Request.countDocuments(query);
    return {total, ngoRequests};
}

async function getNGORequestById(id){
    let ngoRequest = await NGO_Request.findById(id).populate('userId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return ngoRequest
}

async function getNGORequestByUserId(userId){
    let ngoRequest = await NGO_Request.findOne({userId: userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return ngoRequest
}

async function deleteNGORequestById(requestId){
    let ngoRequest = await NGO_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!ngoRequest){
        throw new createHttpError.NotFound("NGO Request with given id is not available");
    }

    return ngoRequest;
}

module.exports = {validityOfNGORequest, getRequestsByQuery, getNGORequestById, getNGORequestByUserId, deleteNGORequestById}