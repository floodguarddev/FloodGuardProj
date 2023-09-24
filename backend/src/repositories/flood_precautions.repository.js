let Flood_Precaution = require('./../models/flood_precaution.model');
const createHttpError = require('http-errors');

async function getFloodPrecautionsByQuery(query, limit, offset){
    let flood_precatuions = await Flood_Precaution.find(query)
    .skip(offset)
    .limit(limit);

    return flood_precatuions;
}

async function getFloodPrecautionById(id){
    let flood_precatuion = await Flood_Precaution.findById(id).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    });

    return flood_precatuion;
}
module.exports = {getFloodPrecautionsByQuery, getFloodPrecautionById}