const floodPrecautionServices = require("../services/flood_precautions.services");
const { addStringQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

//Delete
async function deletePrecaution(req, res, next){
    try{
        let precautionId = req.params.precautionId;
        await floodPrecautionServices.deletePrecaution(precautionId);
        return res.status(200).send(messageResponse("success", `Flood Precaution with id ${precautionId} has been deleted successfully.`))
    }
    catch(error)
    {
        next(error);
    }
}
//Edit
async function editPrecaution(req, res, next){
    try{
        let precautionId = req.params.precautionId;
        let {title, description, precautions} = req.body;
        let flood_precaution = await floodPrecautionServices.editPrecaution(precautionId, {title, description, precautions});
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}
//Add
async function addPrecaution(req, res, next){
    try{
        let {title, description, precautions} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}
//View
async function viewSpecificPrecaution(req, res, next){
    try{
        let precautionId = req.params.precautionId;

        let flood_precaution = await floodPrecautionServices.getSpecificPrecaution(precautionId);

        return res.status(200).send(dataResponse("success", {flood_precaution}))
    }
    catch(error)
    {
        next(error);
    }
}
//View All
async function viewPrecautions(req, res, next){
    try{
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('title', mongooseQuery, query);
        addStringQuery('description', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        let flood_precautions = await floodPrecautionServices.getFloodPrecautions( mongooseQuery, limit, offset);

        return res.status(200).send(dataResponse("success", {...flood_precautions}))
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {editPrecaution, viewPrecautions, viewSpecificPrecaution, addPrecaution, deletePrecaution}