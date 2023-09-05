
const userServices = require('../services/users.services');
const { dataResponse } = require('../utils/commonResponse');

async function signup(req, res, next){
    try{
        const {email, password, name} = req.body;
        let signupRes = await userServices.signup(name, email, password);
        return res.status(201).send(dataResponse("success", signupRes))
    }
    catch(error){
        return next(error);
    }
}

module.exports = {signup}