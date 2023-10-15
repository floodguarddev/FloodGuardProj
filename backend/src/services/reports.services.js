const usersRepository = require("../repositories/users.repository");
const { convertMonthlyCountsToArrays } = require("../utils/reportsUtils");

async function getUsersCount(){
    let montlyUsersCount = await usersRepository.getMonthlyUserCounts();
    let monthly = convertMonthlyCountsToArrays(montlyUsersCount);

    return {monthly};
}

module.exports = {getUsersCount};