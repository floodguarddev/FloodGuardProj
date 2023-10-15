
const { getUsersCount } = require("../services/reports.services");
const { dataResponse } = require("../utils/commonResponse");
async function getUsersStatus(req, res, next){
    try{
        let usersCount = await getUsersCount();
        return res.status(200).send(dataResponse("success", {usersCount}));
    }
    catch(error){
        next(error);
    }
}

module.exports = {getUsersStatus}