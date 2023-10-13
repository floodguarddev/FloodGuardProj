const User = require("../models/user.model");
const Local_Strategy = require("../models/local_strategy.model");
const { isUserAvailableUsingEmail, getUserRoles, getUserUsingEmail, getUserById, getUsersByQuery } = require("../repositories/users.repository");
const { generateHash, comparePassword } = require("../utils/passwordGeneration");
const createHttpError = require('http-errors');
const { getToken, getRefreshToken } = require("../utils/authentication");
const { getHashedPassword, changePassword } = require("../repositories/local_strategy.repository");
const { sendUserResetPasswordEmail } = require("../utils/resetPassword");
const { sendUserVerficationEmail } = require("../utils/emailVerification");


/*----------------------Assosiated with User Role------------------------*/

/*
Sign Up

Expected Input
(name: String, email: String, password:String)

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

async function signup(name, email, password){

    if(await isUserAvailableUsingEmail(email)){
        throw new createHttpError.Conflict("User with current email already exists");
    }

    let hashedPassword = generateHash(password);

    let authStrategy = "local";

    let user = new User({name, email, authStrategy});

    let roles = await getUserRoles(user._id) 

    let payload = {
        id: user._id,
        email: user.email,
        authStrategy: user.authStrategy,
        ...roles
    }

    let token = getToken(payload);

    let refreshToken = getRefreshToken(payload);

    user.refreshTokens.push({refreshToken});

    await user.save();
    await Local_Strategy.create({userId: user._id, hashedPassword});

    return {token, user, refreshToken};
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
    console.log(email, password);
    let user = await getUserUsingEmail(email);

    if(!user){
        throw new createHttpError.NotFound("User with given email doesn't exist");
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    let hashedPassword = await getHashedPassword(user._id);

    let isMatch = comparePassword(password, hashedPassword);

    if(!isMatch){
        throw new createHttpError.Unauthorized("Please provide correct credentials to login");
    }

    let roles = await getUserRoles(user._id) 

    let payload = {
        id: user._id,
        email: user.email,
        authStrategy: user.authStrategy,
        ...roles
    }

    let token = getToken(payload);

    let refreshToken = getRefreshToken(payload);

    user.refreshTokens.push({refreshToken});

    user.save();

    return {token, user, refreshToken};
}

/*
Send Reset Password Email
Expected Input
(email: String)
*/

async function sendPasswordResetEmail(email){

    let user = await getUserUsingEmail(email);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given information doesn't exist")
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    let emailResponse =  await sendUserResetPasswordEmail(user.email).catch((error)=>{
        throw new createHttpError.InternalServerError(error);
    })

    if(emailResponse.accepted.length == 0){
        throw new createHttpError.InternalServerError("Reset Password Email couldn't be sent to targeted email");
    }
}

async function resetPassword(email, newPassword){

    let hashedPassword = generateHash(newPassword);

    let user = await getUserUsingEmail(email);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given information doesn't exist")
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    await changePassword(user.id, hashedPassword);
}

async function setPassword(userId, oldPassword, newPassword){

    let user = await getUserById(userId);

    if(!user){
        throw new createHttpError.NotFound("User with given email doesn't exist");
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    let hashedPassword = await getHashedPassword(user._id);

    let isMatch = comparePassword(oldPassword, hashedPassword);

    if(!isMatch){
        throw new createHttpError.Unauthorized("Please provide correct credentials to login");
    }
    
    let newHashedPassword = generateHash(newPassword);

    await changePassword(userId, newHashedPassword);
}


async function sendVerificationEmail(userId){
    let user = await getUserById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given details doesn't exist");
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    if(user.verified){
        throw new createHttpError.Conflict("User with current email is already verified");
    }

    let emailResponse = await sendUserVerficationEmail(user.email).catch(error=>{
        throw new createHttpError.InternalServerError(error);
    });

    if(emailResponse.accepted.length == 0){
        throw new createHttpError.InternalServerError("Email couldn't be send to targetted email id");
    }
}

async function verifyEmail(email){

    let user = await getUserUsingEmail(email);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given details doesn't exist");
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    if(user.verified){
        throw new createHttpError.Conflict("User with current email is already verified");
    }

    user.verified = true;

    await user.save();

    return user;
}

async function getUserProfile(userId){
    let user = await getUserById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given information doesn't exist")
    }

    return user;
}


async function refreshToken(userId, refreshToken){

    let user = await getUserById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with given details doesn't exist");
    }

    let roles = await getUserRoles(user._id) 

    let payload = {
        id: user._id,
        email: user.email,
        authStrategy: user.authStrategy,
        ...roles
    }

    let token = getToken(payload);

    let newRefreshToken = getRefreshToken(payload);

    let changed = false;

    for(let i = 0; i<user.refreshTokens.length; i++){
        if(user.refreshTokens[i].refreshToken == refreshToken){
            user.refreshTokens[i].refreshToken = newRefreshToken;
            changed = true;
            break;
        }
    }

    if(!changed){
        throw new createHttpError.BadRequest("Refresh Token is not valid");
    }
    
    await user.save();

    return {token, user, refreshToken: newRefreshToken};
}

async function signout(userId, refreshToken){
    let user = await getUserById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with given details doesn't exist");
    }

    let refreshTokensLength = user.refreshTokens.length;

    user.refreshTokens = user.refreshTokens.filter((refreshTokenObj)=>refreshTokenObj.refreshToken != refreshToken);

    if(refreshTokensLength <= user.refreshTokens.length ){
        throw new createHttpError.NotFound("Provided refresh token doesn't exist");
    }

    await user.save();
}


/*----------------------Assosiated with Admin Role------------------------*/

async function addUser(name, email, password, userPhotoLink){

    if(await isUserAvailableUsingEmail(email)){
        throw new createHttpError.Conflict("User with current email already exists");
    }

    let hashedPassword = generateHash(password);

    let authStrategy = "local";

    let user = new User({name, email, authStrategy, userPhotoLink});


    await user.save();
    await Local_Strategy.create({userId: user._id, hashedPassword});

    return user;
}


async function deleteUser(userId){
    let user = await User.findByIdAndDelete(userId);
    
    if(!user)
    {
        throw new createHttpError.NotFound("User with given details doesn't exist");
    }
    //Will be implemented later//
    
    return user;
}

async function editUser(userId, userObject){
    let user = await getUserById(userId);

    let objectToPass = {};
    
    if(!user)
    {
        throw new createHttpError.NotFound("User with given details doesn't exist");
    }
    //If Email is present in user Object//
    if(userObject.email){
        if(user.authStrategy != "local"){
            throw new createHttpError.BadRequest("Given user is not using local authentication, So Email cannot be edited");
        }
        user.email = userObject.email;
        user.verified = false;
    }

    if(userObject.name){
        user.name = userObject.name;
    }

    if(userObject.userPhotoLink){
        user.userPhotoLink = userObject.userPhotoLink;
    }

    await user.save();

    return user;
}

async function changeUserPassword(userId, newPassword){
    let hashedPassword = generateHash(newPassword);

    let user = await getUserById(userId);

    if(!user)
    {
        throw new createHttpError.NotFound("User with the given information doesn't exist")
    }

    if(user.authStrategy != "local"){
        throw new createHttpError.BadRequest("Given user is not using local authentication");
    }

    await changePassword(user.id, hashedPassword);
}

async function viewUsers(query, limit, offset){
    let users = await getUsersByQuery(query, limit, offset);

    return users;
}

module.exports = {signup, signin, sendPasswordResetEmail, resetPassword, sendVerificationEmail, verifyEmail, getUserProfile, setPassword, refreshToken, signout, addUser, deleteUser, editUser, viewUsers, changeUserPassword}