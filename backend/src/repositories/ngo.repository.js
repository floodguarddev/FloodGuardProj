const NGO = require('../models/ngo.model');
const createHttpError = require('http-errors');

async function getNGOByUserId(userId){
    let ngo = await NGO.findOne({userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return (ngo)
}

async function validityOfNGO(userId, cnicNumber, ngoName, ngoContactNumber, ngoId){
    let ngo = await NGO.findOne({$or: [
        {userId: userId},
        {cnicNumber: cnicNumber},
        {ngoName: ngoName},
        {ngoContactNumber: ngoContactNumber},
        {ngoId: ngoId}
    ]})

    if(!ngo)
        return; //There is no Request, so It is valid
    
    if(ngo.userId = userId){
        throw new createHttpError.Conflict("NGO Request with given userId already Exists");
    }
    else if(ngo.cnicNumber == cnicNumber){
        throw new createHttpError.Conflict("NGO Request with given cnic number already exists");
    }
    else if(ngo.ngoContactNumber == ngoContactNumber){
        throw new createHttpError.Conflict("NGO Request with given Ngo contact number already exists");
    }
    else if(ngo.ngoName == ngoName){
        throw new createHttpError.Conflict("Ngo request with given NGO name is already available");
    }
    else if(ngo.ngoId == ngoId){
        throw new createHttpError.Conflict("Ngo request with given NGO id is already available");
    }
}

async function getNGOsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngos = await NGO.find(query)
    .select({
        address: 1,
        ngoImageLink: 1,
        ngoName: 1,
        ngoContactNumber: 1,
        ngoId: 1
    })
    .skip(offset)
    .limit(limit);

    return ngos;
}

async function getNGOById(ngoId){
    let ngo = await NGO.findById(ngoId).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return ngo
}

async function deleteNGOById(ngoId){
    let ngo = await NGO.findByIdAndDelete(ngoId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!ngo){
        throw new createHttpError.NotFound("NGO with given id is not available");
    }

    return ngo;
}


module.exports = {getNGOByUserId, validityOfNGO, getNGOsByQuery, getNGOById, deleteNGOById}
