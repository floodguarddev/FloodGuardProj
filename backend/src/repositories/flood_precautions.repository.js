let Flood_Precaution = require('./../models/flood_precaution.model');
const createHttpError = require('http-errors');

async function getFloodPrecautionsByQuery(query, limit, offset){
    let flood_precautions = await Flood_Precaution.find(query)
    .skip(offset)
    .limit(limit);
    const total = await Flood_Precaution.countDocuments(query);
    return {total, flood_precautions};
}

async function getFloodPrecautionById(id){
    let flood_precaution = await Flood_Precaution.findById(id).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    });

    return flood_precaution;
}
module.exports = {getFloodPrecautionsByQuery, getFloodPrecautionById}