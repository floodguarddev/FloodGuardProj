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
        },
      },
      {
        $group: {
          _id: {
            month: '$month',
            year: '$year',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);
    return userCounts;
};

module.exports = {getUserUsingEmail, getUserById, getUserRoles, isUserAvailableUsingEmail, getUsersByQuery, getMonthlyUserCounts}