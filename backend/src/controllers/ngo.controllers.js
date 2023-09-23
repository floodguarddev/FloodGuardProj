const multerFilesParser = require("../utils/multerFilesParser");
const ngoServices = require("../services/ngos.services");
const { addStringQuery } = require("../utils/query");
const { dataResponse } = require("../utils/commonResponse");

//{frontSideCNICLink, backSideCNICLink: ngoImageLink: registrationCertificateLink: annualReportLink: taxExemptionLink: }

async function applyForNGO(req, res, next){
    try{
        let userId = req.user.id
        const {cnicNumber, address, mobileNumber, assosiatedPersonStatus, ngoName, ngoContactNumber, ngoId, creditCardNumber} = req.body;
        
        let ngoImageLink = await multerFilesParser.getSingleFileUrlRequired("ngoImage", req.files)
        let frontSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("frontSideCNIC", req.files)
        let backSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("backSideCNIC", req.files)
        let registrationCertificateLink = await multerFilesParser.getSingleFileUrlRequired("registrationCertificate", req.files) 
        let annualReportLink = await multerFilesParser.getSingleFileUrlRequired("annualReport", req.files) 
        let taxExemptionLink = await multerFilesParser.getSingleFileUrlRequired("taxExemption", req.files) 



        let ngoRequest = await ngoServices.applyForNGO(userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber)


        return res.status(200).send({ngoRequest});
    }
    catch(error){
        next(error)
    }
}

async function viewNGORequests(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('fullName', mongooseQuery, query);
        addStringQuery('cnicNumber', mongooseQuery, query);
        addStringQuery('address', mongooseQuery, query);
        addStringQuery('mobileNumber', mongooseQuery, query);
        addStringQuery('assosiatedPersonStatus', mongooseQuery, query);
        addStringQuery('ngoContactNumber', mongooseQuery, query);
        addStringQuery('ngoId', mongooseQuery, query);
        addStringQuery('creditCardNumber', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let ngoRequests = await ngoServices.viewNGORequests(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {ngoRequests}));
    }
    catch(error){
        next(error)
    }
}

async function viewSpecificNGORequest(req, res, next){
    try{
        let requestId = req.params.requestId;

        let ngoRequest = await ngoServices.viewSpecificNGORequest(requestId);

        return res.send(dataResponse("success", {ngoRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function rejectNGORequest(req, res, next){
    try{
        let requestId = req.params.requestId;
        
        let ngoRequest = await ngoServices.deleteNGORequest(requestId);

        return res.send(dataResponse("success", {ngoRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function approveNGORequest(req, res, next){
    try{
        let requestId = req.params.requestId;
        
        let ngo = await ngoServices.approveNGORequest(requestId)

        return res.send(dataResponse("success", {ngo}));
    }
    catch(error){
        next(error);
    }
}


async function viewNGORequestByUserId(req, res, next){
    try{
        let userId = req.user.id;

        let ngoRequest = await ngoServices.viewNGORequestByUserId(userId);

        return res.send(dataResponse("success", {ngoRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function editNGORequestByUserId(req, res, next){
    try{
        let userId = req.user.id;
        let ngoRequestObj = req.body;
        delete ngoRequestObj.registrationDate;

        ngoRequestObj.ngoImageLink = await multerFilesParser.getSingleFileUrl("ngoImage", req.files)
        ngoRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrl("frontSideCNIC", req.files)
        ngoRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrl("backSideCNIC", req.files)
        ngoRequestObj.registrationCertificateLink = await multerFilesParser.getSingleFileUrl("registrationCertificate", req.files) 
        ngoRequestObj.annualReportLink = await multerFilesParser.getSingleFileUrl("annualReport", req.files) 
        ngoRequestObj.taxExemptionLink = await multerFilesParser.getSingleFileUrl("taxExemption", req.files) 


        let ngoRequest = await ngoServices.editNGORequestByUserId(userId, ngoRequestObj);

        return res.send(dataResponse("success", {ngoRequest}));
    }
    catch(error){
        return next(error);
    }
}

async function viewNGOs(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('fullName', mongooseQuery, query);
        addStringQuery('cnicNumber', mongooseQuery, query);
        addStringQuery('ngoName', mongooseQuery, query);
        addStringQuery('address', mongooseQuery, query);
        addStringQuery('mobileNumber', mongooseQuery, query);
        addStringQuery('assosiatedPersonStatus', mongooseQuery, query);
        addStringQuery('ngoContactNumber', mongooseQuery, query);
        addStringQuery('ngoId', mongooseQuery, query);
        addStringQuery('creditCardNumber', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let ngos = await ngoServices.viewNGOs(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {ngos}));
    }
    catch(error){
        next(error)
    }
}
async function viewSpecificNGO(req, res, next){
    try{
        let ngoId = req.params.ngoId;

        let ngo = await ngoServices.viewSpecificNGO(ngoId);

        return res.send(dataResponse("success", {ngo}));
    }catch(error){
        next(error)
    }
}
async function deleteNGO(req, res, next){
    try{
        let ngoId = req.params.ngoId;
        
        let ngo = await ngoServices.deleteNGO(ngoId);

        return res.send(dataResponse("success", {ngo}));
    }catch(error){
        next(error)
    }
}
async function editNGO(req, res, next){
    try{
        ngoId = req.params.ngoId;

        console.log(req.body);

        let ngoRequestObj = req.body;

        delete ngoRequestObj.approveDate;
        delete ngoRequestObj.userId;

        ngoRequestObj.ngoImageLink = await multerFilesParser.getSingleFileUrl("ngoImage", req.files)
        ngoRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrl("frontSideCNIC", req.files)
        ngoRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrl("backSideCNIC", req.files)
        ngoRequestObj.registrationCertificateLink = await multerFilesParser.getSingleFileUrl("registrationCertificate", req.files) 
        ngoRequestObj.annualReportLink = await multerFilesParser.getSingleFileUrl("annualReport", req.files) 
        ngoRequestObj.taxExemptionLink = await multerFilesParser.getSingleFileUrl("taxExemption", req.files) 
        
        console.log(ngoRequestObj)

        let ngo = await ngoServices.editNGO(ngoId, ngoRequestObj)


        return res.status(200).send({ngo});
    }catch(error){
        next(error)
    }
}

async function addNGO(req, res, next){
    try{
        userId = req.params.userId;
        const {cnicNumber, address, mobileNumber, assosiatedPersonStatus, ngoName, ngoContactNumber, ngoId, creditCardNumber} = req.body;
        console.log(req.body);
        let ngoImageLink = await multerFilesParser.getSingleFileUrlRequired("ngoImage", req.files)
        let frontSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("frontSideCNIC", req.files)
        let backSideCNICLink = await multerFilesParser.getSingleFileUrlRequired("backSideCNIC", req.files)
        let registrationCertificateLink = await multerFilesParser.getSingleFileUrlRequired("registrationCertificate", req.files) 
        let annualReportLink = await multerFilesParser.getSingleFileUrlRequired("annualReport", req.files) 
        let taxExemptionLink = await multerFilesParser.getSingleFileUrlRequired("taxExemption", req.files) 

        let ngo = await ngoServices.addNGO(userId,cnicNumber,address, mobileNumber, assosiatedPersonStatus, frontSideCNICLink, backSideCNICLink, ngoImageLink, ngoName, ngoContactNumber, ngoId, registrationCertificateLink, annualReportLink, taxExemptionLink, creditCardNumber)


        return res.status(200).send({ngo});
    }catch(error){
        next(error)
    }
}

async function viewMyProfile(req, res, next){
    try{
        let ngoId = req.ngo.id;

        let ngo = await ngoServices.viewSpecificNGO(ngoId);

        return res.send(dataResponse("success", {ngo}));
    }catch(error){
        next(error)
    }
}


async function deleteMyProfile(req, res, next){
    try{
        let ngoId = req.ngo.id;
        
        let ngo = await ngoServices.deleteNGO(ngoId);

        return res.send(dataResponse("success", {ngo}));
    }catch(error){
        next(error)
    }
}
async function editMyProfile(req, res, next){
    try{
        ngoId = req.ngo.id;

        let ngoRequestObj = req.body;

        delete ngoRequestObj.approveDate;
        delete ngoRequestObj.userId;

        ngoRequestObj.ngoImageLink = await multerFilesParser.getSingleFileUrl("ngoImage", req.files)
        ngoRequestObj.frontSideCNICLink = await multerFilesParser.getSingleFileUrl("frontSideCNIC", req.files)
        ngoRequestObj.backSideCNICLink = await multerFilesParser.getSingleFileUrl("backSideCNIC", req.files)
        ngoRequestObj.registrationCertificateLink = await multerFilesParser.getSingleFileUrl("registrationCertificate", req.files) 
        ngoRequestObj.annualReportLink = await multerFilesParser.getSingleFileUrl("annualReport", req.files) 
        ngoRequestObj.taxExemptionLink = await multerFilesParser.getSingleFileUrl("taxExemption", req.files) 
        

        let ngo = await ngoServices.editNGO(ngoId, ngoRequestObj)


        return res.status(200).send({ngo});
    }catch(error){
        next(error)
    }
}


module.exports = {
    applyForNGO, viewNGORequests, viewSpecificNGORequest, rejectNGORequest, approveNGORequest,viewMyProfile,
    viewNGOs, viewSpecificNGO, deleteNGO,editNGO, addNGO, viewNGORequestByUserId , editNGORequestByUserId,
    deleteMyProfile, editMyProfile
}