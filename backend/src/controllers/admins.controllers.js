
const cookiesOptions = require('../../config/cookiesConfig');
const adminServices = require('../services/admins.services');
const userServices = require('../services/users.services');
const { dataResponse, messageResponse } = require('../utils/commonResponse');
const { parseResetPasswordToken } = require('../utils/resetPassword');
const { addStringQuery } = require('../utils/query');
const multerFilesParser = require("../utils/multerFilesParser");

/*Handlers for Admin Role*/
async function signin(req, res, next){
    try{
        const {email, password} = req.body;
        let signinRes = await adminServices.signin(email, password);
        res.cookie("refreshToken", signinRes.refreshToken, cookiesOptions)

        return res.status(200).send(dataResponse("success", signinRes))
    }
    catch(error){
        return next(error);
    }
}

async function sendPasswordResetEmail(req, res, next){
    try{
        const {email} = req.body;
        await adminServices.sendPasswordResetEmail(email);
        return res.status(200).send(messageResponse("success", "Reset Password Email has been sent successfully"))
    }
    catch(error){
        return next(error);
    }
}

async function resetPassword(req, res, next){
    try{
        let email = parseResetPasswordToken(req.query.token);
        const {password} = req.body;
        await adminServices.resetPassword(email, password);
        return res.status(200).send(messageResponse("success", "Your password has been changed successfully"));
    }
    catch(error)
    {
        return next(error);
    }
}

async function viewMyProfile(req, res, next){
    try{
        let userId = req.user.id;

        let user = await adminServices.getUserProfile(userId);

        return res.send(dataResponse("success", {user}));
    }
    catch(error){
        return next(error);
    }
}

async function setPassword(req, res, next){
    try{
        let userId = req.user.id;


        let {oldPassword, newPassword} = req.body;

        await adminServices.setPassword(userId, oldPassword, newPassword);

        return res.send(messageResponse("success", "Your password has been changed successfully"));
    }
    catch(error){
        return next(error);
    }
}

async function refreshTokenCall(req, res, next){
    try{
        let oldRefreshToken = req.signedCookies.refreshToken;
        let userId = req.user.id;

        let {token, admin, refreshToken} = await adminServices.refreshToken(userId, oldRefreshToken);

        res.cookie("refreshToken", refreshToken, cookiesOptions);
        
        return res.send(dataResponse("success", {admin, token}));
        
    }
    catch(error){
        return next(error);
    }
}

async function signout(req, res, next){
    try{
        let oldRefreshToken = req.signedCookies.refreshToken;
        let userId = req.user.id;

        await adminServices.signout(userId, oldRefreshToken);

        res.clearCookie("refreshToken");
        return res.status(200).send(dataResponse("success", "You've been logged out successfully."));
    }
    catch(error){
        return next(error);
    }
}


async function addAdmin(req, res, next){
    try{
        const {email, password, name} = req.body;

        let adminPhotoLink = await multerFilesParser.getSingleFileUrl("adminPhotoLink", req.files)

        let admin = await adminServices.addAdmin(name, email, password, adminPhotoLink);
        return res.status(201).send(dataResponse("success", {admin}))
    }
    catch(error){
        return next(error);
    }
}

async function deleteUser(req, res, next){
    try{
        const userId = req.params.userId;
        await userServices.deleteUser(userId);
        return res.status(201).send(dataResponse("success", "User has been deleted successfully"));
    }
    catch(error){
        return next(error);
    }
}

async function editAdmin(req, res, next){
    try{
        let userId = req.params.userId;

        let {name, email} = req.body;
 
        let adminPhotoLink = await multerFilesParser.getSingleFileUrl("adminPhotoLink", req.files)
        
        let admin = await adminServices.updateProfile(userId, name, email, adminPhotoLink);

        return res.status(200).send(dataResponse("success", {admin}));
    }
    catch(error){
        return next(error);
    }
}

async function viewAdmins(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('name', mongooseQuery, query);
        addStringQuery('email', mongooseQuery, query);
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;
        
        let admins = await adminServices.viewAdmins(mongooseQuery, limit, offset);

        return res.send(dataResponse("success", {...admins}));
    }
    catch(error){
        return next(error);
    }
}

async function viewSpecificAdmin(req, res, next){
    try{
        let userId = req.params.userId;

        let user = await adminServices.getUserProfile(userId);

        return res.send(dataResponse("success", {user}));
    }
    catch(error){
        return next(error);
    }
}

async function updateMyProfile(req, res, next){
    try{
        let userId = req.user.id;

        let {name, email} = req.body;
 
        let adminPhotoLink = await multerFilesParser.getSingleFileUrl("adminPhoto", req.files)
        
        let admin = await adminServices.updateProfile(userId, name, email, adminPhotoLink);

        return res.status(200).send(dataResponse("success", {admin}));
    }
    catch(error){
        return next(error);
    }
}

module.exports = {
    signin, sendPasswordResetEmail, resetPassword, viewMyProfile, setPassword, refreshTokenCall, signout,

    addAdmin, viewAdmins, viewSpecificAdmin, updateMyProfile, editAdmin
}