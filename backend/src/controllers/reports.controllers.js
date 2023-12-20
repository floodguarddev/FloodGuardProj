
const reportsServices = require("../services/reports.services");
const { dataResponse } = require("../utils/commonResponse");
const {redisClient} = require('../../config/redisConfig');

async function getUsersStatus(req, res, next){
    try{
        let usersCount = await reportsServices.getUsersCount();
        await redisClient.set(
            `getUsersCount`,
            JSON.stringify(usersCount),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {usersCount}));
    }
    catch(error){
        next(error);
    }
}

async function getDonationsStatus(req, res, next){
    try{
        let donationsCount = await reportsServices.getDonationsCount();
        await redisClient.set(
            `getDonationsStatus`,
            JSON.stringify(donationsCount),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {donationsCount}));
    }
    catch(error){
        next(error);
    }
}


async function getNgosStatus(req, res, next){
    try{
        let ngosCount = await reportsServices.getNgosCount();
        await redisClient.set(
            `getNgosStatus`,
            JSON.stringify(ngosCount),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {ngosCount}));
    }
    catch(error){
        next(error);
    }
}

async function getNgosSummary(req, res, next){
    try{
        let ngosSummary = await reportsServices.getNgosSummary();
        await redisClient.set(
            `getNgosSummary`,
            JSON.stringify(ngosSummary),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {...ngosSummary}));
    }
    catch(error){
        next(error)
    }
}

async function getDonationsSummary(req, res, next){
    try{
        let donationsSummary = await reportsServices.getDonationsSummary();
        await redisClient.set(
            `getDonationsSummary`,
            JSON.stringify(donationsSummary),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {...donationsSummary}));
    }
    catch(error){
        next(error)
    }
}

async function getUsersSummary(req, res, next){
    try{
        let usersSummary = await reportsServices.getUsersSummary();
        await redisClient.set(
            `getUsersSummary`,
            JSON.stringify(usersSummary),
            {
              EX: 180,
              NX: true,
            },
        );
        return res.status(200).send(dataResponse("success", {...usersSummary}));
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {getUsersStatus, getDonationsStatus, getNgosStatus, getNgosSummary, getDonationsSummary, getUsersSummary}