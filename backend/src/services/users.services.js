const User = require("../models/user.model");
const Local_Strategy = require("../models/local_strategy.model");
const { isUserAvailableUsingEmail, getUserRoles } = require("../repositories/users.repository");
const { generateHash } = require("../utils/passwordGeneration");
const createHttpError = require('http-errors');
const { getToken, getRefreshToken } = require("../utils/authentication");

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

    let roles = await getUserRoles(user.id) 

    let payload = {
        id: user._id,
        email: user.email,
        authStrategy: user.authStrategy,
        roles
    }

    let token = getToken(payload);

    let refreshToken = getRefreshToken(payload);

    user.refreshTokens.push({refreshToken});

    await user.save();
    await Local_Strategy.create({userId: user.id, hashedPassword});

    return {token, user, refreshToken};
}


module.exports = {signup}