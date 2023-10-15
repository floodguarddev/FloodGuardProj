const createHttpError = require('http-errors');
const Rescuer_Request = require('../models/rescuer_request.model');


async function validityOfRescuerRequest(userId, cnicNumber, mobileNumber){
    let rescuerRequest = await Rescuer_Request.findOne({$or: [
        {userId: userId},
        {cnicNumber: cnicNumber},
        {mobileNumber: mobileNumber}
    ]})

    if(!rescuerRequest)
        return; //There is no Request, so It is valid
    
    if(rescuerRequest.userId == userId){
        throw new createHttpError.Conflict("Rescuer Request with given userId already Exists");
    }
    else if(rescuerRequest.cnicNumber == cnicNumber){
        throw new createHttpError.Conflict("Rescuer Request with given cnic number already exists");
    }
    else if(rescuerRequest.mobileNumber == mobileNumber){
        throw new createHttpError.Conflict("Rescuer Request with given mobile number already exists");
    }
}

async function getRequestsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let rescuerRequests = await Rescuer_Request.find(query)
    .select({"fullName": 1, "cnicNumber": 1, "mobileNumber":1, "address":1, "rescuerImageLink": 1})
    .skip(offset)
    .sort({registrationDate: -1})
    .limit(limit);

    const total = await Rescuer_Request.countDocuments(query);

    return {total, rescuerRequests};
}

async function getRescuerRequestById(id){
    let rescuerRequest = await Rescuer_Request.findById(id).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return rescuerRequest
}

async function getRescuerRequestByUserId(userId){
    let rescuerRequest = await Rescuer_Request.findOne({userId: userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return rescuerRequest
}

async function deleteRescuerRequestById(requestId){
    let rescuerRequest = await Rescuer_Request.findByIdAndDelete(requestId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!rescuerRequest){
        throw new createHttpError.NotFound("Rescuer Request with given id is not available");
    }

    return rescuerRequest;
}

module.exports = {validityOfRescuerRequest, getRequestsByQuery, getRescuerRequestById, getRescuerRequestByUserId, deleteRescuerRequestById}