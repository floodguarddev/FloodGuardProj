const usersRepository = require("../repositories/users.repository");
const transactionsRepository = require("../repositories/transaction.repository");
const ngosRepository = require("../repositories/ngo.repository");

const { convertLast7DaysFieldsToArray, convertYearlyFieldsToArray, convertMonthlyFieldsToArray, 
    getLastYearCompare } = require("../utils/reportsUtils");

async function getUsersCount(){
    let monthlyUsersCount = await usersRepository.getMonthlyUserCounts();
    let monthly = convertMonthlyFieldsToArray(["count", "verified", "donated"], monthlyUsersCount);
    
    
    let yearlyUsersCount = await usersRepository.getYearlyUserCount();
    let yearly = convertYearlyFieldsToArray(["count", "verified", "donated"], yearlyUsersCount);
    
    let last7daysUsersCount = await usersRepository.getLast7DaysCount();
    let last7days = convertLast7DaysFieldsToArray(["count", "verified", "donated"], last7daysUsersCount);

    return {yearly, monthly, last7days};
}

async function getDonationsCount(){
    let monthlyDonationsCount = await transactionsRepository.getMonthlyCounts();
    let monthly = convertMonthlyFieldsToArray(["count"], monthlyDonationsCount);

    let yearlyDonationsCount = await transactionsRepository.getYearlyCounts();
    let yearly = convertYearlyFieldsToArray(["count"], yearlyDonationsCount);

    let weeklyDonationsCount = await transactionsRepository.getLast7DaysCounts();
    let last7days = convertLast7DaysFieldsToArray(["count"], weeklyDonationsCount);

    return {yearly, monthly, last7days};
}

async function getNgosCount(){
    let monthlyDonationsCount = await ngosRepository.getMonthlyCounts();
    let monthly = convertMonthlyFieldsToArray(["count"], monthlyDonationsCount);

    let yearlyDonationsCount = await ngosRepository.getYearlyCounts();
    let yearly = convertYearlyFieldsToArray(["count"], yearlyDonationsCount);

    let weeklyDonationsCount = await ngosRepository.getLast7DaysCounts();
    let last7days = convertLast7DaysFieldsToArray(["count"], weeklyDonationsCount);

    return {yearly, monthly, last7days};
}

async function getNgosSummary(){
    let {ngosCount, total} = await ngosRepository.getNgosSummary();

    let lastYearCompare = getLastYearCompare(ngosCount);

    return {total, lastYearCompare}
}

async function getUsersSummary(){
    let {usersCount, total} = await usersRepository.getUsersSummary();
    
    let lastYearCompare = getLastYearCompare(usersCount);

    return {total, lastYearCompare}
}

async function getDonationsSummary(){
    let {donationsCount, total} = await transactionsRepository.getDonationsSummary();
    
    let lastYearCompare = getLastYearCompare(donationsCount);

    return {total, lastYearCompare}
}


module.exports = {getUsersCount, getDonationsCount, getNgosCount, getNgosSummary, getUsersSummary, getDonationsSummary};