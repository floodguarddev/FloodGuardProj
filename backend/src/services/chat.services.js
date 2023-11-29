const createHttpError = require('http-errors');
const chatRepository = require('./../repositories/chat.repository');
async function getContactsHistory(userId){

    let contactsHistory = await chatRepository.getContactsHistory(userId);

    return contactsHistory;
}

async function getChat(userId, secUserId){   
    let chat = await chatRepository.getChat(userId, secUserId);

    return chat
}

module.exports = {getContactsHistory, getChat}