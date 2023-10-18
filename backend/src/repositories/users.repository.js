let User = require('./../models/user.model');
const { getNGOByUserId } = require('./ngo.repository');
const { getRescuerByUserId } = require('./rescuer.repository');
const createHttpError = require('http-errors');


async function getUserUsingEmail(email){
    let user = await User.findOne({email}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return user
}

async function isUserAvailableUsingEmail(email){
    let user = await getUserUsingEmail(email);

    return (user != null);
}

async function getUserById(userId){
    let user = await User.findById(userId).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return user
}


async function getUserRoles(userId){
    let roles = {};
    
    let rescuer = await getRescuerByUserId(userId);
    if(rescuer)
        roles.rescuer = {id : rescuer._id};

    let ngo = await getNGOByUserId(userId);
    if(ngo)
        roles.ngo = {id : ngo._id};

    return roles
}

async function getUsersByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){

    let users = await User.find(query).sort({createdDate: -1}).skip(offset).limit(limit);
    const total = await User.countDocuments(query);

    return {total, users};
}

async function getMonthlyUserCounts() {

    const currentDate = new Date();
    const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

    const userCounts = await User.aggregate([
      {
        $match: {
          createdDate: {
            $gte: lastYearStartDate,
            $lte: currentDate,
          },
        },
      },
      {
        $project: {
          month: { $month: '$createdDate' },
          year: { $year: '$createdDate' },
          verified: "$verified",
          donations: "$donations"
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
          },
          count: { $sum: 1 },
          verified: {$sum: { "$cond": [{ "$eq": ["$verified", true] }, 1, 0] } },
          donated: {$sum: {"$cond": [{"$gt": ["$donations", 0]}, 1, 0]}}
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);
    return userCounts;
};

async function getYearlyUserCount() {

  const currentDate = new Date();
  const last10YearsDate = new Date(currentDate.getFullYear() - 10, 0, 1);

  const userCounts = await User.aggregate([
    {
      $match: {
        createdDate: {
          $gte: last10YearsDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: { $year: '$createdDate' },
        verified: "$verified",
          donations: "$donations"
      },
    },
    {
      $group: {
        _id: {
          year: '$year',
        },
        count: { $sum: 1 },
        verified: {$sum: { "$cond": [{ "$eq": ["$verified", true] }, 1, 0] } },
        donated: {$sum: {"$cond": [{"$gt": ["$donations", 0]}, 1, 0]}}
      },
    },
    {
      $sort: { '_id.year': 1},
    },
  ]);
  return userCounts;
};

async function getLast7DaysCount(){
  const currentDate = new Date();
  const sevenDaysBackDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate() - 7);

  const userCounts = await User.aggregate([
    {
      $match: {
        createdDate: {
          $gte: sevenDaysBackDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: {$year: '$createdDate'},
        month: { $month: '$createdDate' },
        date: {$dayOfMonth: '$createdDate'},
        day: { $dayOfWeek: '$createdDate' },
        verified: "$verified",
          donations: "$donations"
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
        count: { $sum: 1 },
        verified: {$sum: { "$cond": [{ "$eq": ["$verified", true] }, 1, 0] } },
          donated: {$sum: {"$cond": [{"$gt": ["$donations", 0]}, 1, 0]}}
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.date': 1},
    },
  ]);

  return userCounts;
}

async function getUsersSummary(){
  let usersCount = await  getYearlyUserCount();
  const total = await User.countDocuments({});
  return {usersCount, total};
}
module.exports = {getUserUsingEmail, getUserById, getUserRoles, isUserAvailableUsingEmail, getUsersByQuery, getMonthlyUserCounts, getYearlyUserCount, getLast7DaysCount, getUsersSummary}