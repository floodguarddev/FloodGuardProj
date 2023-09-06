const createHttpError = require('http-errors')
const {getPayload, getRefreshTokenPayload} = require('../utils/authentication.js')

const verifyLocalStrategy = (req, res, next) =>{
  try{
    if(!req.user.authStrategy == "local")
    {
      throw new createHttpError.MethodNotAllowed("Given functionality can only be used in Local Authentication Strategy");
    }
    
    return next()
  }
  catch(error){
    return next(error);
  }
}

const verifyOauthStrategy = (req, res, next) => {
  try{
    if(!req.user.authStrategy == "oauth")
    {
      throw new createHttpError.MethodNotAllowed("Given functionality can only be used in Open Authentication Strategy");
    }
    
    next()
  }
  catch(error){
    return next(error);
  }
}

const verifyUser = (req,res,next)=>{
  try{
    let payload = getPayload(req);
    
    if(payload){
        req.user = {id: payload.id, authStrategy: payload.authStrategy, roles: payload.roles};
    }
    else{
      throw new createHttpError.Unauthorized("User is not authentic");
    }
    return next()
  }
  catch(error){
    return next(error);
  }
    
}

const verifyRefreshToken = (req, res, next)=>{
    try{
      // Check if req.body.user exists, create it if it doesn't
      let payload = getRefreshTokenPayload(req);
      if(payload){
        req.user = {id: payload.id};
      }
      else{
        throw new createHttpError.Unauthorized("User is not authentic");
      }
      return next()
    }
    catch(error){
      return next(error);
    }
    
}

module.exports = {verifyUser, verifyRefreshToken, verifyOauthStrategy, verifyLocalStrategy}