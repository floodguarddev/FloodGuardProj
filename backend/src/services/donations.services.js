const createHttpError = require('http-errors');
const ngoRepository = require('../repositories/ngo.repository');
const { generateStripeVerificationToken, parseStripeVerificationToken } = require('../utils/stripe');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const NGO = require('../models/ngo.model');
const transactionRepository = require('../repositories/transaction.repository');
const fund_raising_postModel = require('../models/fund_raising_post.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ObjectId = require('mongoose').Types.ObjectId;

async function getConnectLink(ngoId){

    let ngo = await ngoRepository.getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound("NGO with given id doesn't exists");
    }

    if(ngo.stripeAccountId){
        throw new createHttpError.Conflict("NGO already have an stripe account connected");
    }

    let token = generateStripeVerificationToken(ngoId);

    let connectLink = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&state=${token}`

    return connectLink;
}

async function addNGOStripeAccountId(stateToken, authCode){
    let ngoId = parseStripeVerificationToken(stateToken);

    let ngo = await ngoRepository.getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound("NGO with given id doesn't exists");
    }

    let stripeInfo = await stripe.oauth.token({
        grant_type: 'authorization_code',
        code: authCode
    })

    ngo.stripeAccountId = stripeInfo.stripe_user_id;

    await ngo.save();
}

async function stripeCallBack(event){
    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          successfulPayment(paymentIntentSucceeded);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
    }
}

async function createPaymentIntent(userId, amount, ngoId, postId = undefined){
    let ngo = await ngoRepository.getNGOById(ngoId);

    if(!ngo){
        throw new createHttpError.NotFound('NGO with given id is not valid');
    }

    if(!ngo.stripeAccountId){
        throw new createHttpError.NotAcceptable("Given NGO doesn't have an Stripe Account Connected");
    }

    let ngoStripeAccountID =  ngo.stripeAccountId;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount*100,
        currency: 'pkr',
        application_fee_amount: amount*2.5, //To Avoid Tax, So Balance shouldn't go in negative
        payment_method_types: ['card'], 
        transfer_data: {
            destination: ngoStripeAccountID, // Transfer to the specified NGO
        },
        metadata:{
            userId,
            postId,
            ngoId
        }
    });

    return paymentIntent.client_secret;
}

async function successfulPayment(paymentIntentSucceededObj){
    if(paymentIntentSucceededObj.status !== "succeeded"){
        return
    }

    let userId = paymentIntentSucceededObj.metadata.userId;
    let ngoId = paymentIntentSucceededObj.metadata.ngoId;
    let postId = paymentIntentSucceededObj.metadata.postId || null ;
    let amount = (paymentIntentSucceededObj.amount - paymentIntentSucceededObj.application_fee_amount)/100;
    let paymentId = paymentIntentSucceededObj.id;

    //First Make A Transaction between User and NGO//
    let transaction = await Transaction.create(
        {paymentId: paymentId, 
        sender: userId, 
        reciever: ngoId, 
        amount: amount}
        ).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    )
    if(ngoId){
        let ngo = await NGO.findById(ngoId);
        ngo.recievedDonations = ngo.recievedDonations + amount;
        await ngo.save();
    }
    if(userId){
        let user = await User.findById(userId);
        user.donations = user.donations + amount;
        await user.save();
    }
    if(postId){
        let post = await fund_raising_postModel.findById(postId).catch((error)=>{
            throw new createHttpError.InternalServerError(error);
        })
        
        if(!post)
            throw new createHttpError.NotFound('Failed To Find Post With ID ${postId}')

        post.transactions.push(transaction._id);

        post.recievedAmount = post.recievedAmount + transaction.amount;
        if(post.recievedAmount > post.requestedAmount){
            post.completed = true;
        }
        await post.save().catch((error)=>{
            throw new createHttpError.InternalServerError(error);
        });
    }

}

async function viewSpecficDonation(donationId){
    let donation = await transactionRepository.getTransactionById(donationId)

    if(!donation){
        throw new createHttpError.NotFound("There is no donation available with given id");
    }

    return donation;
}

async function viewDonations(query, limit, offset){
    let donations = await transactionRepository.getTransactionsByQuery(query, limit, offset);

    return donations;
}

async function getDonationsByNGO(ngoId, query, limit, offset){
    query["reciever._id"] = new ObjectId(ngoId);
    let transactions = await transactionRepository.getTransactionsByQuery (query, limit, offset);
    return transactions;
}

async function getDonationsByUser(userId, query, limit, offset){
    query["sender._id"] = new ObjectId(userId);
    let transactions = await transactionRepository.getTransactionsByQuery (query, limit, offset);
    return transactions;
}

module.exports = {viewSpecficDonation, viewDonations, getDonationsByNGO, getDonationsByUser, getConnectLink, addNGOStripeAccountId, createPaymentIntent, stripeCallBack}