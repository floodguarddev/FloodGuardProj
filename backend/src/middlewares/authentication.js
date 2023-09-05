const createHttpError = require('http-errors')
const {getPayload, getRefreshTokenPayload} = require('../utils/authentication.js')

const verifyLocalStrategy = (req, res, next) =>{
  if(!req.user.authStrategy == "local")
  {
    throw new createHttpError.MethodNotAllowed("Given functionality can only be used in Local Authentication Strategy");
  }
  
  next()
}

const verifyOauthStrategy = (req, res, next) => {
  if(!req.user.authStrategy == "oauth")
  {
    throw new createHttpError.MethodNotAllowed("Given functionality can only be used in Open Authentication Strategy");
  }
  
  next()
}

const verifyUser = (req,res,next)=>{
    // Check if req.body.user exists, create it if it doesn't
    let payload = getPayload(req);
    
    if(payload){
        req.user = {id: payload.id, authStrategy: payload.authStrategy};
    }
    else{
      throw new createHttpError.Unauthorized("User is not authentic");
    }
    next()
}

const verifyRefreshToken = (req, res, next)=>{
    // Check if req.body.user exists, create it if it doesn't
    let payload = getRefreshTokenPayload(req);

    if(payload){
      req.user = {id: payload.id};
    }
    else{
      throw new createHttpError.Unauthorized("User is not authentic");
    }
    next()
}

module.exports = {verifyUser, verifyRefreshToken, verifyOauthStrategy, verifyLocalStrategy}