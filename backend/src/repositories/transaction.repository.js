let Transaction = require('./../models/transaction.model');
const createHttpError = require('http-errors');


async function getTransactionsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let transactions = await Transaction.aggregate(
        [
            { $lookup: { from:"users", localField:'sender', foreignField:"_id" , as : 'sender' } },
            { $lookup: { from:"ngos", localField:'reciever', foreignField:"_id" , as : 'reciever' } },
            { $unwind: "$reciever"},
            { $unwind: "$sender"},
            { $sort: {transactionDate: -1}},
            { $match: query},
            { $skip: offset},
            { $limit: parseInt(limit)}
        ]
    );

    const info = await Transaction.aggregate([
      { $lookup: { from: "users", localField: 'sender', foreignField: "_id", as: 'sender' } },
      { $lookup: { from: "ngos", localField: 'reciever', foreignField: "_id", as: 'reciever' } },
      { $unwind: "$reciever" },
      { $unwind: "$sender" },
      { $sort: { transactionDate: -1 } },
      { $match: query },
      {
          $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
              total: { $sum: 1 } // Count the number of documents
          }
      }
  ]);
    

    console.log(info);

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

    return {total: info[0].total, totalAmount: info[0].totalAmount, transactions};
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


async function getMonthlyCounts() {

    const currentDate = new Date();
    const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

    const transactionCounts = await Transaction.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: lastYearStartDate,
            $lte: currentDate,
          },
        },
      },
      {
        $project: {
          month: { $month: '$transactionDate' },
          year: { $year: '$transactionDate' },
          amount: "$amount"
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
          },
          count: { $sum: "$amount" },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    return transactionCounts;
};

async function getYearlyCounts() {

  const currentDate = new Date();
  const last10YearsDate = new Date(currentDate.getFullYear() - 10, 0, 1);

  const transactionCounts = await Transaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: last10YearsDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: { $year: '$transactionDate' },
        amount: "$amount"
      },
    },
    {
      $group: {
        _id: {
          year: '$year',
        },
        count: { $sum: "$amount" },
      },
    },
    {
      $sort: { '_id.year': 1},
    },
  ]);
  return transactionCounts;
};

async function getLast7DaysCounts(){
  const currentDate = new Date();
  const sevenDaysBackDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate() - 7);

  const transactionCounts = await Transaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: sevenDaysBackDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: {$year: '$transactionDate'},
        month: { $month: '$transactionDate' },
        date: {$dayOfMonth: '$transactionDate'},
        day: { $dayOfWeek: '$transactionDate' },
        amount: "$amount"
      },
    },
    {
      $group: {
        _id: {
          year: '$year',
          month: '$month',
          date: '$date',
          day: '$day',
        },
        count: { $sum: "$amount" },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.date': 1},
    },
  ]);
  return transactionCounts;
}

async function getDonationsSummary(){
  let donationsCount = await  getYearlyCounts();
  const total = (await Transaction.aggregate([
    { $group: { _id: null, amount: { $sum: "$amount" } } }
  ]))[0].amount;
  console.log(total);
  return {donationsCount, total};
}

module.exports = {getTransactionsByQuery, getTransactionById, getMonthlyCounts, getYearlyCounts, getLast7DaysCounts, getDonationsSummary}