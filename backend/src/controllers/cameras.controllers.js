const cameraServices = require("../services/cameras.services");
const { dataResponse, messageResponse } = require("../utils/commonResponse");

//View
async function viewCameras(req, res, next){
    try{
        let cameras = await cameraServices.viewCameras();

        return res.status(200).send(dataResponse("success", {cameras}))
    }
    catch(error)
    {
        next(error);
    }
}
//Edit
async function editCameraByRescuer(req, res, next){
    try{
        let cameraId = req.params.cameraId;
        let rescuerId = req.rescuer.id;

        let {lat, lon} = req.body;

        let camera = await cameraServices.editCameraByRescuer(cameraId, rescuerId, lat, lon)
 
        return res.status(200).send(dataResponse("success", {camera}))
    }
    catch(error)
    {
        next(error);
    }
}
//Add
async function getAssignedCameras(req, res, next){
    try{
        let rescuerId = req.rescuer.id;

        let cameras = await cameraServices.getAssignedCameras(rescuerId);

        return res.status(200).send(dataResponse("success", {cameras}));
    }
    catch(error)
    {
        next(error);
    }
}

async function addCamera(req, res, next){
    try{
        let {lat, lon, uniqueId, rescuerId} = req.body;

        let camera = await cameraServices.addCamera(lat, lon, uniqueId, rescuerId);

        res.status(201).send(dataResponse("success", {camera}));
    }
    catch(error)
    {
        next(error);
    }
}
async function editCamera(req,res,next){
    try{
        let cameraId = req.params.cameraId;
        let {lat, lon, uniqueId, rescuerId} = req.body;

        let camera = await cameraServices.editCamera(cameraId, lat, lon, uniqueId, rescuerId);

        res.status(201).send(dataResponse("success", {camera}));
    }
    catch(error)
    {
        next(error);
    }
}

async function deleteCamera(req,res,next){
    try{
        let cameraId = req.params.cameraId;
        
        let camera = await cameraServices.deleteCamera(cameraId);

        res.status(200).send(messageResponse("success", `Camera with id ${cameraId} has been deleted`));
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {viewCameras, editCameraByRescuer, getAssignedCameras, viewCameras, addCamera, editCamera, deleteCamera}