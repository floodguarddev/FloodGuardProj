const User = require("../models/user.model");
const Local_Strategy = require("../models/local_strategy.model");
const { isUserAvailableUsingEmail } = require("../repositories/users.repository");
const { generateHash } = require("../utils/passwordGeneration");
const createHttpError = require('http-errors');
/*
Sign Up
*/

async function signup(name, email, password){

    if(await isUserAvailableUsingEmail(email)){
        throw new createHttpError.Conflict("User with current email already exists");
    }

    let hashedPassword = generateHash(password);

    let authStrategy = "local";

    let user = new User({name, email, authStrategy});

    await user.save();
    await Local_Strategy.create({userId: user.id, hashedPassword});


    return user.toJSON();
}


module.exports = {signup}