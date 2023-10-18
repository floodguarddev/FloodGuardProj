
const reportsServices = require("../services/reports.services");
const { dataResponse } = require("../utils/commonResponse");
async function getUsersStatus(req, res, next){
    try{
        let usersCount = await reportsServices.getUsersCount();
        return res.status(200).send(dataResponse("success", {usersCount}));
    }
    catch(error){
        next(error);
    }
}

async function getDonationsStatus(req, res, next){
    try{
        let donationsCount = await reportsServices.getDonationsCount();
        return res.status(200).send(dataResponse("success", {donationsCount}));
    }
    catch(error){
        next(error);
    }
}


async function getNgosStatus(req, res, next){
    try{
        let ngosCount = await reportsServices.getNgosCount();
        return res.status(200).send(dataResponse("success", {ngosCount}));
    }
    catch(error){
        next(error);
    }
}

async function getNgosSummary(req, res, next){
    try{
        let ngosSummary = await reportsServices.getNgosSummary();
        return res.status(200).send(dataResponse("success", {...ngosSummary}));
    }
    catch(error){
        next(error)
    }
}

async function getDonationsSummary(req, res, next){
    try{
        let donationsSummary = await reportsServices.getDonationsSummary();
        return res.status(200).send(dataResponse("success", {...donationsSummary}));
    }
    catch(error){
        next(error)
    }
}

async function getUsersSummary(req, res, next){
    try{
        let usersSummary = await reportsServices.getUsersSummary();
        return res.status(200).send(dataResponse("success", {...usersSummary}));
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {getUsersStatus, getDonationsStatus, getNgosStatus, getNgosSummary, getDonationsSummary, getUsersSummary}