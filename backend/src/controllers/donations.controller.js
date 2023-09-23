const createHttpError = require("http-errors");
const donationServices = require("../services/donations.services");
const { dataResponse, messageResponse } = require("../utils/commonResponse");
const { addNumberQuery, addStringQuery, addDateQuery } = require("../utils/query");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getConnectLink(req, res, next){
    try{
        let ngoId = req.ngo.id;

        let connectLink = await donationServices.getConnectLink(ngoId);

        return res.status(200).send(dataResponse("success", {connectLink}));
    }
    catch(error){
        next(error);
    }
}


async function authorizeAccount(req, res, next){
    console.log(req.query);
    try{
        let stateToken = req.query.state;
        let authCode = req.query.code;
        
        await donationServices.addNGOStripeAccountId(stateToken, authCode);

        return res.status(200).json(messageResponse("Stripe account has been successfully added in ngo"));
    }
    catch(error){
        next(error);
    }
}

async function createPaymentIntent(req, res, next){
    try{
        let userId = req.user.id;
        let {amount, ngoId, postId} = req.body;

        let client_secret = await donationServices.createPaymentIntent(userId, amount, ngoId, postId);

        return res.status(200).send({client_secret});
    }
    catch(error){
        next(error);
    }
}

async function stripeCallBack(req, res, next){
    try{
        const sig = req.headers['stripe-signature'];
        const endpointSecret = "whsec_a49513b868b1909c2d6975b495262c6ec575b9cb0c6024d75fa3f45ac4861db8";
        let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

        await donationServices.stripeCallBack(event);
    
        // Return a 200 response to acknowledge receipt of the event
        res.send();
    }
    catch(error){
        next(error);
    }
}

async function getDonationsByUser(req, res, next){
    try{
        let userId = req.user.id;

        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('paymentId', mongooseQuery, query);
        addStringQuery(['receiver', 'ngoName'], mongooseQuery, query);
        addStringQuery(['sender', 'name'], mongooseQuery, query);
        addDateQuery('transactionDate', mongooseQuery, query);
        addNumberQuery('amount', mongooseQuery, query )
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0; 

        let myDonations = await donationServices.getDonationsByUser(userId, mongooseQuery, limit, offset);
        
        return res.status(200).send(dataResponse("success", {donations: myDonations}));
    }
    catch(error){
        next(error);
    }
}

async function getDonationsByNGO(req, res, next){
    try{
        let ngoId = req.ngo.id;

        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('paymentId', mongooseQuery, query);
        addStringQuery(['receiver', 'ngoName'], mongooseQuery, query);
        addStringQuery(['sender', 'name'], mongooseQuery, query);
        addDateQuery('transactionDate', mongooseQuery, query);
        addNumberQuery('amount', mongooseQuery, query )
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0; 

        let myDonations = await donationServices.getDonationsByNGO(ngoId, mongooseQuery, limit, offset);
        
        return res.status(200).send(dataResponse("success", {donations: myDonations}));
    }
    catch(error){
        next(error);
    }
}

async function getSpecificDonation(req, res, next){
    try{
        let donationId = req.params.donationId;
        
        let donation = await donationServices.viewSpecficDonation(donationId);
        
        return res.status(200).send(dataResponse("success", {donation}));
    }
    catch(error){
        next(error);
    }
}

async function getDonations(req, res, next){
    try{
        //Filtering//
        let mongooseQuery = {};
        let query = req.query;
        addStringQuery('paymentId', mongooseQuery, query);
        addStringQuery(['receiver', 'ngoName'], mongooseQuery, query);
        addStringQuery(['sender', 'name'], mongooseQuery, query);
        addDateQuery('transactionDate', mongooseQuery, query);
        addNumberQuery('amount', mongooseQuery, query )
        //Pagination//
        let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
        let offset = parseInt(req.query.offset) || 0;

        let donations = await donationServices.viewDonations(mongooseQuery, limit, offset);

        return res.status(200).send(dataResponse("success", {donations}));

    }
    catch(error){
        next(error);
    }
}

module.exports = {getDonationsByUser, getDonationsByNGO, getDonations, getSpecificDonation, createPaymentIntent, stripeCallBack, authorizeAccount, getConnectLink}