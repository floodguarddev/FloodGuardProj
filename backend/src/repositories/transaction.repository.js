let Transaction = require('./../models/transaction.model');
const createHttpError = require('http-errors');


async function getTransactionsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let transactions = await Transaction.aggregate(
        [
            { $lookup: { from:"users", localField:'sender', foreignField:"_id" , as : 'sender' } },
            { $lookup: { from:"ngos", localField:'reciever', foreignField:"_id" , as : 'reciever' } },
            { $unwind: "$reciever"},
            { $unwind: "$sender"},
            { $match: query},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );


    transactions = transactions.map(
        (obj)=>{
            let newObj = {
                ...obj, 
                userId:  obj.sender._id,
                name: obj.sender.name, 
                ngoName: obj.reciever.ngoName, 
                ngoImageLink: obj.reciever.ngoImageLink,
                ngoId: obj.reciever._id
            };
            delete newObj.sender;
            delete newObj.reciever;
            return newObj;
        }
    );

    return transactions;
}

async function getTransactionById(id){
    let transaction = await Transaction.findById(id).populate('sender').populate('reciever').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    transaction = 
    {...transaction.toJSON(), 
     userId:  transaction.sender._id,
     name: transaction.sender.name, 
     ngoName: transaction.reciever.ngoName, 
     ngoImageLink: transaction.reciever.ngoImageLink,
     ngoId: transaction.reciever._id,
    };
    
    delete transaction.sender;
    delete transaction.reciever;
    return transaction;
}

module.exports = {getTransactionsByQuery, getTransactionById}