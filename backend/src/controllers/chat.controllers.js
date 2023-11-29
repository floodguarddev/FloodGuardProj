
const chatServices = require('../services/chat.services');
const { dataResponse } = require('../utils/commonResponse');
const multerFilesParser = require("../utils/multerFilesParser");

/*Handlers for Admin Role*/

async function getContactsHistory(req, res, next){
    try{
        let userId = req.user.id;

        let contactsHistory = await chatServices.getContactsHistory(userId);
        
        return res.status(200).send(dataResponse("success", {contactsHistory}))
    }
    catch(error){
        return next(error);
    }
}


async function getChat(req, res, next){
    try{
        let userId = req.user.id;
        let secUserId = req.params.userId

        let chat = await chatServices.getChat(userId, secUserId);
        
        return res.status(200).send(dataResponse("success", {chat}))
    }
    catch(error){
        return next(error);
    }
}

module.exports = {
    getContactsHistory, getChat
}