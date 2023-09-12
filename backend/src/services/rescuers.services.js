const createHttpError = require('http-errors');
const Rescuer_Request = require('../models/rescuer_request.model');
const Rescuer = require('../models/rescuer.model');
const rescuerRepository = require('../repositories/rescuer.repository')
const rescuerRequestRepository = require('../repositories/rescuer_request.repository')


/*Rescuer Requests*/

async function applyForRescuer(userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink){
    await rescuerRepository.validityOfRescuer(userId, cnicNumber, mobileNumber);

    await rescuerRequestRepository.validityOfRescuerRequest(userId, cnicNumber, mobileNumber);
    

    let rescuerRequest = await Rescuer_Request.create({userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink})

    return rescuerRequest;
}

async function editRescuerRequestByUserId(userId, rescuerRequestObj){
    let rescuerRequest = await Rescuer_Request.findOneAndUpdate({userId}, rescuerRequestObj, {new: true})

    return rescuerRequest; 
}

async function viewRescuerRequests(query, limit, offset){
    let rescuerRequests = await rescuerRequestRepository.getRequestsByQuery(query, limit, offset);

    return rescuerRequests;
}

async function viewSpecificRescuerRequest(requestId){
    let rescuerRequest = await rescuerRequestRepository.getRescuerRequestById(requestId);

    if(!rescuerRequest)
    {
        throw new createHttpError.NotFound("Request with the given information doesn't exist")
    }

    return rescuerRequest;
}

async function viewRescuerRequestByUserId(userId){
    let rescuerRequest = await rescuerRequestRepository.getRescuerRequestByUserId(userId);

    if(!rescuerRequest)
    {
        throw new createHttpError.NotFound("Request with the given information doesn't exist")
    }

    return rescuerRequest;
}

async function deleteRescuerRequest(requestId){
    let rescuerRequest = await rescuerRequestRepository.deleteRescuerRequestById(requestId);

    return rescuerRequest;
}

async function approveRescuerRequest(requestId){
    let rescuerRequest = await rescuerRequestRepository.deleteRescuerRequestById(requestId);
    rescuerRequest = rescuerRequest.toJSON();

    delete rescuerRequest._id;
    delete rescuerRequest.__v;
    delete rescuerRequest.registrationDate;

    let rescuer = await Rescuer.create(rescuerRequest);

    return rescuer;
}

/*Rescuers*/

async function addRescuer(userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink){
    await rescuerRepository.validityOfRescuer(userId, cnicNumber, mobileNumber);

    await rescuerRequestRepository.validityOfRescuerRequest(userId, cnicNumber, mobileNumber);
    

    let rescuer = await Rescuer.create({userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink})

    return rescuer;
}

async function viewRescuers(query, limit, offset){
    let rescuers = await rescuerRepository.getRescuersByQuery(query, limit, offset);

    return rescuers;
}

async function viewSpecificRescuer(rescuerId){
    let rescuer = await rescuerRepository.getRescuerById(rescuerId);

    if(!rescuer)
    {
        throw new createHttpError.NotFound("Rescuer with the given information doesn't exist")
    }

    return rescuer;
}

async function deleteRescuer(rescuerId){
    let rescuer = await rescuerRepository.deleteRescuerById(rescuerId);

    return rescuer;
}

async function editRescuer(rescuerId, rescuerObj){
    let rescuerRequest = await Rescuer.findByIdAndUpdate(rescuerId, rescuerObj, {new: true})

    return rescuerRequest; 
}

module.exports = {
    /*Rescuer Requests*/
    applyForRescuer, viewRescuerRequests, viewSpecificRescuerRequest, deleteRescuerRequest, approveRescuerRequest, viewRescuerRequestByUserId, editRescuerRequestByUserId,
    /*Rescuers*/
    addRescuer, viewRescuers, viewSpecificRescuer, deleteRescuer, editRescuer
}