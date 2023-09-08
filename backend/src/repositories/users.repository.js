let User = require('./../models/user.model');
const { isNGO } = require('./ngo.repository');
const { isRescuer } = require('./rescuer.repository');
const createHttpError = require('http-errors');


async function getUserUsingEmail(email){
    let user = await User.findOne({email}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return user
}

async function isUserAvailableUsingEmail(email){
    let user = await getUserUsingEmail(email);

    return (user != null);
}

async function getUserById(userId){
    let user = await User.findById(userId).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return user
}


async function getUserRoles(userId){
    roles = [];
    

    if(await isRescuer(userId))
        roles.push("rescuer");

    if(await isNGO(userId))
        roles.push("ngo");

    return roles
}

async function getUsersByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let users = await User.find(query).skip(offset).limit(limit);

    return users;
}

module.exports = {getUserUsingEmail, getUserById, getUserRoles, isUserAvailableUsingEmail, getUsersByQuery}