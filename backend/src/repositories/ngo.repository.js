const NGO = require('../models/ngo.model');
const createHttpError = require('http-errors');

async function getNGOByUserId(userId){
    let ngo = await NGO.findOne({userId}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return (ngo)
}

async function validityOfNGO(userId, cnicNumber, ngoName, ngoContactNumber, ngoId){
    let ngo = await NGO.findOne({$or: [
        {userId: userId},
        {cnicNumber: cnicNumber},
        {ngoName: ngoName},
        {ngoContactNumber: ngoContactNumber},
        {ngoId: ngoId}
    ]})

    if(!ngo)
        return; //There is no Request, so It is valid
    
    if(ngo.userId == userId){
        throw new createHttpError.Conflict("NGO Request with given userId already Exists");
    }
    else if(ngo.cnicNumber == cnicNumber){
        throw new createHttpError.Conflict("NGO Request with given cnic number already exists");
    }
    else if(ngo.ngoContactNumber == ngoContactNumber){
        throw new createHttpError.Conflict("NGO Request with given Ngo contact number already exists");
    }
    else if(ngo.ngoName == ngoName){
        throw new createHttpError.Conflict("Ngo request with given NGO name is already available");
    }
    else if(ngo.ngoId == ngoId){
        throw new createHttpError.Conflict("Ngo request with given NGO id is already available");
    }
}

async function getNGOsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let ngos = await NGO.find(query)
    .select({
        address: 1,
        ngoImageLink: 1,
        ngoName: 1,
        ngoContactNumber: 1,
        ngoId: 1,
        receivedDonations: 1
    })
    .sort({approvedDate: -1})
    .skip(offset)
    .limit(limit);

    const total = await NGO.countDocuments(query);
    return {total, ngos};
}

async function getNGOById(ngoId){
    let ngo = await NGO.findById(ngoId).populate('userId').catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return ngo
}

async function deleteNGOById(ngoId){
    let ngo = await NGO.findByIdAndDelete(ngoId).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error)
        }
    )

    if(!ngo){
        throw new createHttpError.NotFound("NGO with given id is not available");
    }

    return ngo;
}


async function getMonthlyCounts() {

    const currentDate = new Date();
    const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);

    const ngoCounts = await NGO.aggregate([
      {
        $match: {
            approvedDate: {
            $gte: lastYearStartDate,
            $lte: currentDate,
          },
        },
      },
      {
        $project: {
          month: { $month: '$approvedDate' },
          year: { $year: '$approvedDate' },
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
    return ngoCounts;
};

async function getYearlyCounts() {

  const currentDate = new Date();
  const last10YearsDate = new Date(currentDate.getFullYear() - 10, 0, 1);

  const ngoCounts = await NGO.aggregate([
    {
      $match: {
        approvedDate: {
          $gte: last10YearsDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: { $year: '$approvedDate' },
      },
    },
    {
      $group: {
        _id: {
          year: '$year',
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1},
    },
  ]);
  return ngoCounts;
};

async function getLast7DaysCounts(){
  const currentDate = new Date();
  const sevenDaysBackDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate() - 7);

  const ngoCounts = await NGO.aggregate([
    {
      $match: {
        approvedDate: {
          $gte: sevenDaysBackDate,
          $lte: currentDate,
        },
      },
    },
    {
      $project: {
        year: {$year: '$approvedDate'},
        month: { $month: '$approvedDate' },
        date: {$dayOfMonth: '$approvedDate'},
        day: { $dayOfWeek: '$approvedDate' },
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
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1, '_id.date': 1},
    },
  ]);

  return ngoCounts;
}

async function getNgosSummary(){
  let ngosCount = await  getYearlyCounts();
  const total = await NGO.countDocuments({});
  return {ngosCount, total};
}

module.exports = {getNGOByUserId, validityOfNGO, getNGOsByQuery, getNGOById, deleteNGOById,
                    getMonthlyCounts, getLast7DaysCounts, getYearlyCounts, getNgosSummary}
