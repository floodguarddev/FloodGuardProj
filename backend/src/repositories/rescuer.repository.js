const createHttpError = require('http-errors');
const Rescuer = require('../models/rescuer.model');


async function getRescuerByUserId(userId){
    let rescuer = await Rescuer.findOne({userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return (rescuer)
}

async function validityOfRescuer(userId, cnicNumber, mobileNumber){
    let rescuer = await Rescuer.findOne({$or: [
        {userId: userId},
        {cnicNumber: cnicNumber},
        {mobileNumber: mobileNumber}
    ]})

    if(!rescuer)
        return; //There is no Rescuer, so It is valid

    if(rescuer.userId = userId){
        throw new createHttpError.Conflict("Rescuer with given userId already Exists");
    }
    else if(rescuer.cnicNumber == cnicNumber){
        throw new createHttpError.Conflict("Rescuer with given cnic number already exists");
    }
    else if(rescuer.mobileNumber == mobileNumber){
        throw new createHttpError.Conflict("Rescuer with given mobile number already exists");
    }
}

async function getRescuersByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let rescuers = await Rescuer.find(query)
    .select({"fullName": 1, "cnicNumber": 1, "mobileNumber":1, "address":1, "rescuerImageLink": 1, "approvedDate": 1, "blocked": 1})
    .skip(offset)
    .limit(limit);

    return rescuers;
}

async function getRescuerById(rescuerId){
    let rescuer = await Rescuer.findById(rescuerId).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return rescuer
}

async function deleteRescuerById(rescuerId){
    let rescuer = await Rescuer.findByIdAndDelete(rescuerId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!rescuer){
        throw new createHttpError.NotFound("Rescuer with given id is not available");
    }

    return rescuer;
}


module.exports = {getRescuerByUserId, validityOfRescuer, getRescuersByQuery, getRescuerById, deleteRescuerById}