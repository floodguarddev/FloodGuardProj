const {redisClient} = require('../../config/redisConfig');
const { dataResponse } = require('../utils/commonResponse');

module.exports.getUsersStatus = async (req, res, next)=>{
    let usersCount = await redisClient.get('getUsersStatus');
    usersCount = JSON.parse(usersCount);
    if(usersCount){
        return res.status(200).send(dataResponse("success", {usersCount}));
    }
    else
    {
        next();
    }
}

module.exports.getDonationsStatus = async(req, res, next)=>{
    let donationsCount = await redisClient.get('getDonationsStatus');
    donationsCount = JSON.parse(donationsCount);
    if(donationsCount){
        return res.status(200).send(dataResponse("success", {donationsCount}));
    }
    else
    {
        next();
    }
}

module.exports.getNgosStatus = async(req, res, next)=>{
    let ngosCount = await redisClient.get('getNgosStatus');
    ngosCount = JSON.parse(ngosCount);
    if(ngosCount){
        return res.status(200).send(dataResponse("success", {ngosCount}));
    }
    else
    {
        next();
    }
}

module.exports.getNgosSummary = async(req, res, next)=>{
    let ngosSummary = await redisClient.get('getNgosSummary');
    ngosSummary = JSON.parse(ngosSummary);
    if(ngosSummary){
        return res.status(200).send(dataResponse("success", {...ngosSummary}));
    }
    else
    {
        next();
    }
}

module.exports.getDonationsSummary = async(req, res, next)=>{
    let donationsSummary = await redisClient.get('getDonationsSummary');
    donationsSummary = JSON.parse(donationsSummary);
    if(donationsSummary){
        return res.status(200).send(dataResponse("success", {...donationsSummary}));
    }
    else
    {
        next();
    }
}

module.exports.getUsersSummary = async(req, res, next)=>{
    let usersSummary = await redisClient.get('getUsersSummary');
    usersSummary = JSON.parse(usersSummary);
    if(usersSummary){
        return res.status(200).send(dataResponse("success", {...usersSummary}));
    }
    else
    {
        next();
    }
}