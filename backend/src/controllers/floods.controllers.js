const floodPrecautionServices = require("../services/flood_precautions.services");
const { addStringQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

//Delete
async function viewFloods(req, res, next){
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
async function viewSpecificFlood(req, res, next){
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
//Add
async function reportFlood(req, res, next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}

async function predictFlood(req, res, next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}
async function addFlood(req,res,next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(201).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}

async function editFlood(req,res,next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}

async function deleteFlood(req,res,next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}

async function currentDistrictsFloodStatus(req, res, next){
    try{
        let {lat, log} = req.body;
        let flood_precaution = await floodPrecautionServices.addPrecaution(title, description, precautions);
        res.status(200).send(dataResponse("success", {flood_precaution}));
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {viewFloods, viewSpecificFlood, reportFlood, predictFlood, addFlood, editFlood, deleteFlood, currentDistrictsFloodStatus}