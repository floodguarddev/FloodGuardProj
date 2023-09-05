const NGO = require('../models/ngo.model');


async function isNGO(userId){
    let ngo = await NGO.findOne({userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return (ngo != null)
}


module.exports = {isNGO};