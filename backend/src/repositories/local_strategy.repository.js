const createHttpError = require("http-errors");
const Local_Strategy = require("../models/local_strategy.model");

async function saveHashedPassword(userId, hashedPassword){
    await Local_Strategy.create({userId, hashedPassword}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    );
}

async function getHashedPassword(userId){

    let {hashedPassword} = await Local_Strategy.findOne({userId}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    );
    
    return hashedPassword;
}

async function changePassword(userId, hashedPassword){
    await Local_Strategy.findOneAndUpdate({userId}, {hashedPassword}, {new: true}).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    );
}

module.exports = {saveHashedPassword, getHashedPassword, changePassword}