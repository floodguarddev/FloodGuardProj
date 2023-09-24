const createHttpError = require('http-errors');
const precautionsRepository = require('../repositories/flood_precautions.repository');
const Flood_Precaution = require('../models/flood_precaution.model');

//Delete
async function deletePrecaution(precautionId){
    let flood_precatuion = await Flood_Precaution.findByIdAndDelete(precautionId).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    });
    if(!flood_precatuion){
        throw new createHttpError.NotFound("Flood Precaution with given id doesn't exist");
    }
    return flood_precatuion;
}
//Edit
async function editPrecaution(precautionId, precautionObj){
    let flood_precatuion = await Flood_Precaution.findByIdAndUpdate(precautionId, precautionObj, {new: true}).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })
    if(!flood_precatuion){
        throw new createHttpError.NotFound("Flood Precaution with given id doesn't exist");
    }
    return flood_precatuion;
}
//Add
async function addPrecaution(title, description, precautions){
    let flood_precatuion = await Flood_Precaution.create({title,  description, precautions}).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })
    return flood_precatuion;
}
//View
async function getSpecificPrecaution(id){
    let flood_precatuion = await precautionsRepository.getFloodPrecautionById(id);

    if(!flood_precatuion)
        throw new createHttpError.NotFound("Flood Precaution with given id doesn't exist");

    return flood_precatuion;
}
//View All
async function getFloodPrecautions(query, limit, offset){
    let flood_precatuions = await precautionsRepository.getFloodPrecautionsByQuery(query, limit, offset);
    return flood_precatuions;
}

module.exports = {deletePrecaution, editPrecaution,addPrecaution,getSpecificPrecaution, getFloodPrecautions}