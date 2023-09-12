const createHttpError = require('http-errors');
const NGO_Request = require('../models/ngo_request.model');
const NGO = require('../models/ngo.model');
const ngoRepository = require('../repositories/ngo.repository')
const ngoRequestRepository = require('../repositories/ngo_request.repository')


/*NGO Requests*/

async function applyForNGO(userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber){
    await ngoRepository.validityOfNGO(userId, cnicNumber, ngoName, ngoContactNumber, ngoId);

    await ngoRequestRepository.validityOfNGORequest(userId, cnicNumber, ngoName, ngoContactNumber, ngoId);
    

    let ngoRequest = await NGO_Request.create({userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber})

    return ngoRequest;
}

async function editNGORequestByUserId(userId, ngoRequestObj){
    let ngoRequest = await NGO_Request.findOneAndUpdate({userId}, ngoRequestObj, {new: true})

    return ngoRequest; 
}

async function viewNGORequests(query, limit, offset){
    let ngoRequests = await ngoRequestRepository.getRequestsByQuery(query, limit, offset);

    return ngoRequests;
}

async function viewSpecificNGORequest(requestId){
    let ngoRequest = await ngoRequestRepository.getNGORequestById(requestId);

    if(!ngoRequest)
    {
        throw new createHttpError.NotFound("Request with the given information doesn't exist")
    }

    return ngoRequest;
}

async function viewNGORequestByUserId(userId){
    let ngoRequest = await ngoRequestRepository.getNGORequestByUserId(userId);

    if(!ngoRequest)
    {
        throw new createHttpError.NotFound("Request with the given information doesn't exist")
    }

    return ngoRequest;
}

async function deleteNGORequest(requestId){
    let ngoRequest = await ngoRequestRepository.deleteNGORequestById(requestId);

    return ngoRequest;
}

async function approveNGORequest(requestId){
    let ngoRequest = await ngoRequestRepository.deleteNGORequestById(requestId);
    ngoRequest = ngoRequest.toJSON();

    delete ngoRequest._id;
    delete ngoRequest.__v;
    delete ngoRequest.registrationDate;

    let ngo = await NGO.create(ngoRequest);

    return ngo;
}

/*NGOs*/

async function addNGO(userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber){
    await ngoRepository.validityOfNGO(userId, cnicNumber, ngoName, ngoContactNumber, ngoId);

    await ngoRequestRepository.validityOfNGORequest(userId, cnicNumber, ngoName, ngoContactNumber, ngoId);
    

    let ngo = await NGO.create({userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber})

    return ngo;
}

async function viewNGOs(query, limit, offset){
    let ngos = await ngoRepository.getNGOsByQuery(query, limit, offset);

    return ngos;
}

async function viewSpecificNGO(ngoId){
    let ngo = await ngoRepository.getNGOById(ngoId);

    if(!ngo)
    {
        throw new createHttpError.NotFound("NGO with the given information doesn't exist")
    }

    return ngo;
}

async function deleteNGO(ngoId){
    let ngo = await ngoRepository.deleteNGOById(ngoId);

    return ngo;
}

async function editNGO(ngoId, ngoObj){
    let ngoRequest = await NGO.findByIdAndUpdate(ngoId, ngoObj, {new: true})

    return ngoRequest; 
}

module.exports = {
    /*NGO Requests*/
    applyForNGO, viewNGORequests, viewSpecificNGORequest, deleteNGORequest, approveNGORequest, viewNGORequestByUserId, editNGORequestByUserId,
    /*NGOs*/
    addNGO, viewNGOs, viewSpecificNGO, deleteNGO, editNGO
}