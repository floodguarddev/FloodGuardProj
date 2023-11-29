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
        req.user = {id: payload.id, authStrategy: payload.authStrategy};
        req.rescuer = payload.rescuer;
        req.ngo = payload.ngo;
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

const verifyRescuer = (req,res,next)=>{
  try{
    if(!req.rescuer.id){
      throw new createHttpError.Unauthorized("User is not a rescuer");
    }
    next();
  }
  catch(error){
    return next(error);
  }
}

const verifyNGO = (req,res,next)=>{
  try{
    if(!req.ngo.id){
      throw new createHttpError.Unauthorized("User is not a rescuer");
    }
    next();
  }
  catch(error){
    return next(error);
  }
}


const verifyAdmin = (req,res,next)=>{
  try{
    let payload = getPayload(req);
    
    if(payload){
        req.user = {id: payload.id, authStrategy: payload.authStrategy, roles: payload.roles};
    }
    else{
      throw new createHttpError.Unauthorized("User is not authentic");
    }

    if(req.user.roles[0] != "admin"){
      throw new createHttpError.Unauthorized("Given User doesn't have admin access");
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

module.exports = {verifyUser, verifyAdmin, verifyRescuer, verifyNGO, verifyRefreshToken, verifyOauthStrategy, verifyLocalStrategy}