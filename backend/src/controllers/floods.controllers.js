const floodServices = require("../services/floods.services");
const { addStringQuery } = require("../utils/query");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

//Delete
async function viewFloods(req, res, next){
    try{
        let floods = await floodServices.getFloods();

        return res.status(200).send(dataResponse("success", {floods}))
    }
    catch(error)
    {
        next(error);
    }
}
//Edit
async function viewSpecificFlood(req, res, next){
    try{
        let floodId = req.params.floodId;

        let flood = await floodServices.getSpecificFlood(floodId);
 
        return res.status(200).send(dataResponse("success", {flood}))
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

async function getFloodPrediction(req, res, next){
    try{
        let {lat, lon} = req.query;
        
        let predictiondetails = await floodServices.predictFlood(lat, lon);
        
        res.status(200).send(dataResponse("success", {...predictiondetails}));
    }
    catch(error)
    {
        next(error);
    }
}
async function addFlood(req,res,next){
    try{
        let {description, date, districts} = req.body;
        let flood = await floodServices.addFlood(date, description, districts);
        res.status(201).send(dataResponse("success", {flood}));
    }
    catch(error)
    {
        next(error);
    }
}

async function editFlood(req,res,next){
    try{
        let floodId = req.params.floodId;
        let {description, date, districts} = req.body;
        let flood = await floodServices.editFlood(floodId, date, description, districts)
        res.status(200).send(dataResponse("success", {flood}));
    }
    catch(error)
    {
        next(error);
    }
}

async function deleteFlood(req,res,next){
    try{
        let floodId = req.params.floodId;
        let flood = await floodServices.deleteFlood(floodId);
        res.status(200).send(messageResponse("success", `Flood with id ${floodId} has been deleted`));
    }
    catch(error)
    {
        next(error);
    }
}

async function viewFloodPredictionHeatMap(req, res, next){
    try{
        let districts = await floodServices.getFloodPredictionHeatmap()
        res.status(200).send(dataResponse("success", {districts}));
    }
    catch(error)
    {
        next(error);
    }
}


module.exports = {viewFloods, viewSpecificFlood, reportFlood, getFloodPrediction, addFlood, editFlood, deleteFlood, viewFloodPredictionHeatMap}