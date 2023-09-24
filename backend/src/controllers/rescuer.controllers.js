const multerFilesParser = require("../utils/multerFilesParser");
const rescuerServices = require("../services/rescuers.services");
const { addStringQuery } = require("../utils/query");
const { dataResponse } = require("../utils/commonResponse");


async function applyForRescuer(req, res, next){
    try{
        let userId = req.user.id
        const {fullName, cnicNumber, address, mobileNumber} = req.body;
        let rescuerImageLink = await multerFilesParser.getSingleFileUrlRequired("rescuerImage", req.files)
        let frontSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("frontSideCNIC", req.files)
        let backSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("backSideCNIC", req.files)
        let rescuerApprovalLink = await multerFilesParser.getSingleFileUrlRequired("rescuerApproval", req.files) 

        let rescuerRequest = await rescuerServices.applyForRescuer(userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink)


        return res.status(200).send({rescuerRequest});
    }
    catch(error){
        next(error)
    }
}

async function viewRescuerRequests(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('fullName', mongooseQuery, query);
        addStringQuery('cnicNumber', mongooseQuery, query);
        addStringQuery('address', mongooseQuery, query);
        addStringQuery('mobileNumber', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let rescuerRequests = await rescuerServices.viewRescuerRequests(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {rescuerRequests}));
    }
    catch(error){
        next(error)
    }
}

async function viewSpecificRescuerRequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let rescuerRequest = await rescuerServices.viewSpecificRescuerRequest(requestId);

        return res.send(dataResponse("success", {rescuerRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function rejectRescuerRequest(req, res, next){
    try{
        let requestId = req.params.requestId;
        
        let rescuerRequest = await rescuerServices.deleteRescuerRequest(requestId);

        return res.send(dataResponse("success", {rescuerRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function approveRescuerRequest(req, res, next){
    try{
        let requestId = req.params.requestId;
        
        let rescuer = await rescuerServices.approveRescuerRequest(requestId)

        return res.send(dataResponse("success", {rescuer}));
    }
    catch(error){
        next(error);
    }
}


async function viewRescuerRequestByUserId(req, res, next){
    try{
        let userId = req.user.id;

        let rescuerRequest = await rescuerServices.viewRescuerRequestByUserId(userId);

        return res.send(dataResponse("success", {rescuerRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function editRescuerRequestByUserId(req, res, next){
    try{
        let userId = req.user.id;
        let rescuerRequestObj = req.body;
        delete rescuerRequestObj.registrationDate;

        rescuerRequestObj.rescuerImageLink = await multerFilesParser.getSingleFileUrlRequired("rescuerImage", req.files)
        rescuerRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("frontSideCNIC", req.files)
        rescuerRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("backSideCNIC", req.files)
        rescuerRequestObj.rescuerApprovalLink = await multerFilesParser.getSingleFileUrlRequired("rescuerApproval", req.files) 


        let rescuerRequest = await rescuerServices.editRescuerRequestByUserId(userId, rescuerRequestObj);

        return res.send(dataResponse("success", {rescuerRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewRescuers(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('fullName', mongooseQuery, query);
        addStringQuery('cnicNumber', mongooseQuery, query);
        addStringQuery('address', mongooseQuery, query);
        addStringQuery('mobileNumber', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let rescuers = await rescuerServices.viewRescuers(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {rescuers}));
    }
    catch(error){
        next(error)
    }
}
async function viewSpecificRescuer(req, res, next){
    try{
        let rescuerId = req.params.rescuerId;

        let rescuer = await rescuerServices.viewSpecificRescuer(rescuerId);

        return res.send(dataResponse("success", {rescuer}));
    }catch(error){
        next(error)
    }
}
async function deleteRescuer(req, res, next){
    try{
        let rescuerId = req.params.rescuerId;
        
        let rescuer = await rescuerServices.deleteRescuer(rescuerId);

        return res.send(dataResponse("success", {rescuer}));
    }catch(error){
        next(error)
    }
}
async function editRescuer(req, res, next){
    try{
        let rescuerId = req.params.rescuerId;

        let rescuerRequestObj = req.body;
        delete rescuerRequestObj.approveDate;
        delete rescuerRequestObj.userId;

        rescuerRequestObj.rescuerImageLink = await multerFilesParser.getSingleFileUrl("rescuerImage", req.files)
        rescuerRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrl("frontSideCNIC", req.files)
        rescuerRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrl("backSideCNIC", req.files)
        rescuerRequestObj.rescuerApprovalLink = await multerFilesParser.getSingleFileUrl("rescuerApproval", req.files) 
        
        let rescuer = await rescuerServices.editRescuer(rescuerId, rescuerRequestObj)


        return res.status(200).send({rescuer});
    }catch(error){
        next(error)
    }
}
async function addRescuer(req, res, next){
    try{
        let userId = req.params.userId;
        const {fullName, cnicNumber, address, mobileNumber} = req.body;
        
        let rescuerImageLink = await multerFilesParser.getSingleFileUrlRequired("rescuerImage", req.files)
        let frontSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("frontSideCNIC", req.files)
        let backSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("backSideCNIC", req.files)
        let rescuerApprovalLink = await multerFilesParser.getSingleFileUrlRequired("rescuerApproval", req.files) 

        let rescuer = await rescuerServices.addRescuer(userId, fullName, cnicNumber, address, mobileNumber, rescuerImageLink, frontSideCNICLink, backSideCNICLink, rescuerApprovalLink)


        return res.status(200).send({rescuer});
    }catch(error){
        next(error)
    }
}

async function viewMyProfile(req, res, next){
    try{
        let rescuerId = req.rescuer.id;

        let rescuer = await rescuerServices.viewSpecificRescuer(rescuerId);

        return res.send(dataResponse("success", {rescuer}));
    }catch(error){
        next(error)
    }
}

async function deleteMyProfile(req, res, next){
    try{
        let rescuerId = req.rescuer.id;
        
        let rescuer = await rescuerServices.deleteRescuer(rescuerId);

        return res.send(dataResponse("success", {rescuer}));
    }catch(error){
        next(error)
    }
}
async function editMyProfile(req, res, next){
    try{
        let rescuerId = req.rescuer.id;

        let rescuerRequestObj = req.body;
        delete rescuerRequestObj.approveDate;
        delete rescuerRequestObj.userId;

        rescuerRequestObj.rescuerImageLink = await multerFilesParser.getSingleFileUrl("rescuerImage", req.files)
        rescuerRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrl("frontSideCNIC", req.files)
        rescuerRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrl("backSideCNIC", req.files)
        rescuerRequestObj.rescuerApprovalLink = await multerFilesParser.getSingleFileUrl("rescuerApproval", req.files) 
        
        let rescuer = await rescuerServices.editRescuer(rescuerId, rescuerRequestObj)


        return res.status(200).send({rescuer});
    }catch(error){
        next(error)
    }
}

module.exports = {
    applyForRescuer, viewRescuerRequests, viewSpecificRescuerRequest, rejectRescuerRequest, approveRescuerRequest,viewMyProfile,
    viewRescuers, viewSpecificRescuer, deleteRescuer,editRescuer, addRescuer, viewRescuerRequestByUserId , editRescuerRequestByUserId,
    deleteMyProfile, editMyProfile
}