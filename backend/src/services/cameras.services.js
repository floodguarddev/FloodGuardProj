const createHttpError = require('http-errors');
const { getAddress } = require('../utils/location');
const cameraModel = require('../models/camera.model');

async function viewCameras(){
    let cameras = await cameraModel.find({}).populate("assignedTo");
    
    return cameras;
}
async function addCamera(lat, lon, uniqueId,  rescuerId){
    console.log(rescuerId);
    let address = await getAddress(lat, lon);
    let camera = await cameraModel.create({lat, lon, uniqueId, assignedTo: rescuerId, address: address});

    return camera;
} 

async function editCamera(id, lat, lon, uniqueId,  rescuerId){
    let address = await getAddress(lat, lon);
    let camera = await cameraModel.findByIdAndUpdate(id, {lat, lon, uniqueId, assignedTo: rescuerId, address}, {new: true});

    if(!camera)
    {
        throw new createHttpError.NotFound(`Camera with given id ${id} doesn't exist`);
    }

    return camera;
}

async function deleteCamera(id){
    let camera = await cameraModel.findByIdAndDelete(id);
    
    if(!camera)
    {
        throw new createHttpError.NotFound(`Camera with given id ${id} doesn't exist`);
    }

    return camera;
}

async function editCameraByRescuer(id, rescuerId, lat, lon){
    let address = await getAddress(lat, lon);
    let camera = await cameraModel.findOneAndUpdate({_id:id, assignedTo: rescuerId}, {lat, lon, address}, {new: true});

    if(!camera)
    {
        throw new createHttpError.NotFound(`Camera with given id ${id} doesn't exist or belongs to this rescuer`);
    }
  
    return camera;
}

async function getAssignedCameras(rescuerId){
    let cameras = cameraModel.find({assignedTo: rescuerId})

    return cameras
}

module.exports = {viewCameras, addCamera, editCamera, deleteCamera, editCameraByRescuer, getAssignedCameras}