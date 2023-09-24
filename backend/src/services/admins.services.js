const Admin = require("../models/admin.model");
const Local_Strategy = require("../models/local_strategy.model");
const { isAdminAvailableUsingEmail, getAdminUsingEmail, getAdminById, getAdminsByQuery } = require("../repositories/admins.repository");
const { generateHash, comparePassword } = require("../utils/passwordGeneration");
const createHttpError = require('http-errors');
const { getToken, getRefreshToken } = require("../utils/authentication");
const { getHashedPassword, changePassword } = require("../repositories/local_strategy.repository");
const { sendAdminResetPasswordEmail } = require("../utils/resetPassword");


/*Add Admin*/

async function addAdmin(name, email, password){

    if(await isAdminAvailableUsingEmail(email)){
        throw new createHttpError.Conflict("Admin with current email already exists");
    }

    let hashedPassword = generateHash(password);

    let admin = new Admin({name, email});


    await admin.save();
    await Local_Strategy.create({userId: admin._id, hashedPassword, userModel: 'Admin'});

    return admin;
}


/*
Sign In

Expected Input
(email: String, password:String)

Expected Output
{
    refreshToken: String,
    token: String,
    user:{
        name: String,
        email: String,
        verified: Boolean,
        authStrategy: String
    }
}
*/

async function signin(email, password){
    let admin = await getAdminUsingEmail(email);

    if(!admin){
        throw new createHttpError.NotFound("Admin with given email doesn't exist");
    }

    let hashedPassword = await getHashedPassword(admin._id);

    let isMatch = comparePassword(password, hashedPassword);

    if(!isMatch){
        throw new createHttpError.Unauthorized("Please provide correct credentials to login");
    }

    let roles = ["admin"] 

    let payload = {
        id: admin._id,
        email: admin.email,
        authStrategy: "local",
        roles
    }

    let token = getToken(payload);

    let refreshToken = getRefreshToken(payload);

    admin.refreshTokens.push({refreshToken});

    admin.save();

    return {token, admin, refreshToken};
}

/*
Send Reset Password Email
Expected Input
(email: String)
*/

async function sendPasswordResetEmail(email){

    let admin = await getAdminUsingEmail(email);

    if(!admin)
    {
        throw new createHttpError.NotFound("Admin with the given information doesn't exist")
    }

    if(admin.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given Admin is not using local authentication");
    }

    let emailResponse =  await sendAdminResetPasswordEmail(admin.email).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })

    if(emailResponse.accepted.length == 0){
        throw new createHttpError.InternalServerError("Reset Password Email couldn't be sent to targeted email");
    }
}

async function resetPassword(email, newPassword){

    let hashedPassword = generateHash(newPassword);

    let admin = await getAdminUsingEmail(email);

    if(!admin)
    {
        throw new createHttpError.NotFound("Admin with the given information doesn't exist")
    }

    if(admin.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given Admin is not using local authentication");
    }

    await changePassword(admin.id, hashedPassword);
}

async function setPassword(userId, oldPassword, newPassword){

    let admin = await getAdminById(userId);

    if(!admin){
        throw new createHttpError.NotFound("User with given email doesn't exist");
    }

    if(admin.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    let hashedPassword = await getHashedPassword(admin._id);

    let isMatch = comparePassword(oldPassword, hashedPassword);

    if(!isMatch){
        throw new createHttpError.Unauthorized("Please provide correct credentials to login");
    }
    
    let newHashedPassword = generateHash(newPassword);

    await changePassword(userId, newHashedPassword);
}

async function getUserProfile(userId){
    let user = await getAdminById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given information doesn't exist")
    }

    return user;
}


async function refreshToken(userId, refreshToken){

    let admin = await getAdminById(userId);

    if(!admin)
    {
        throw new createHttpError.NotFound("Admin with given details doesn't exist");
    }

    let roles = ["admin"]

    let payload = {
        id: admin._id,
        email: admin.email,
        authStrategy: admin.authStrategy,
        roles
    }

    let token = getToken(payload);

    let newRefreshToken = getRefreshToken(payload);

    let changed = false;

    for(let i = 0; i<admin.refreshTokens.length; i++){
        if(admin.refreshTokens[i].refreshToken == refreshToken){
            admin.refreshTokens[i].refreshToken = newRefreshToken;
            changed = true;
            break;
        }
    }

    if(!changed){
        throw new createHttpError.BadRequest("Refresh Token is not valid");
    }
    
    await admin.save();

    return {token, admin, refreshToken: newRefreshToken};
}

async function signout(userId, refreshToken){
    let admin = await getAdminById(userId);

    if(!admin)
    {
        throw new createHttpError.NotFound("Admin with given details doesn't exist");
    }

    let refreshTokensLength = admin.refreshTokens.length;

    admin.refreshTokens = admin.refreshTokens.filter((refreshTokenObj)=>refreshTokenObj.refreshToken != refreshToken);

    if(refreshTokensLength <= admin.refreshTokens.length ){
        throw new createHttpError.NotFound("Provided refresh token doesn't exist");
    }

    await admin.save();
}

async function viewAdmins(query, limit, offset){
    let users = await getAdminsByQuery(query, limit, offset);

    return users;
}

module.exports = {signin, sendPasswordResetEmail, resetPassword, getUserProfile, setPassword, refreshToken, signout, addAdmin, viewAdmins}