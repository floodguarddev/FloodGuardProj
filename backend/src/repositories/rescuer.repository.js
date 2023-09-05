const Rescuer = require('../models/rescuer.model');


async function isRescuer(userId){
    let rescuer = await Rescuer.findOne({userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return (rescuer != null)
}

module.exports = {isRescuer}