
const cookiesOptions = require('../../config/cookiesConfig');
const userServices = require('../services/users.services');
const { dataResponse, messageResponse } = require('../utils/commonResponse');


/*Handlers for User Role*/

async function signup(req, res, next){
    try{
        const {email, password, name} = req.body;
        let signupRes = await userServices.signup(name, email, password);
        res.cookie("refreshToken", signupRes.refreshToken, cookiesOptions)
        return res.status(201).send(dataResponse("success", signupRes))
    }
    catch(error){
        return next(error);
    }
}

async function signin(req, res, next){
    try{
        const {email, password} = req.body;
        let signinRes = await userServices.signin(email, password);
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
        await userServices.sendPasswordResetEmail(email);
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
        await userServices.resetPassword(email, password);
        return res.status(200).send(messageResponse("success", "Your password has been changed successfully"));
    }
    catch(error)
    {
        return next(error);
    }
}

async function sendVerificationEmail(req, res, next){
    try{
        let userId = req.user.id;
        await userServices.sendVerificationEmail(userId);
        return res.status(200).send(messageResponse("success", "Account Verifcation Email has been sent successfully"));
    }
    catch(error){
        return next(error);
    }
}

async function verifyEmail(req, res, next){
    try{
        let email = parseEmailVerificationToken(req.query.token);
        
        await userServices.verifyEmail(email);

        return res.send(dataResponse("success", `Your account on email address ${email} has been verified`));
    }
    catch(error){
        return next(error);
    }
}

async function viewMyProfile(req, res, next){
    try{
        let userId = req.user.id;

        let user = await userServices.getUserProfile(userId);

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

        let user = await userServices.setPassword(userId, oldPassword, newPassword);

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

        let {token, refreshToken} = await userServices.refreshToken(userId, oldRefreshToken);

        res.cookie("refreshToken", refreshToken, cookiesOptions);
        
        return res.send(dataResponse("success", {token}));
        
    }
    catch(error){
        return next(error);
    }
}

async function signout(req, res, next){
    try{
        let oldRefreshToken = req.signedCookies.refreshToken;
        let userId = req.user.id;

        await userServices.signout(userId, oldRefreshToken);

        res.clearCookie("refreshToken");
        return res.status(200).send(dataResponse("success", "You've been logged out successfully."));
    }
    catch(error){
        return next(error);
    }
}

module.exports = {
    signup, signin, sendPasswordResetEmail, resetPassword, sendVerificationEmail, verifyEmail, viewMyProfile, setPassword, refreshTokenCall, signout
}