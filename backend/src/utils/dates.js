const moment = require('moment');
function getYesterdayDate(){
    var date = new Date();
    date.setDate(date.getDate() - 1);
    let yesterDayDate = moment(date).format('YYYY-MM-DD');
    return yesterDayDate;
}

module.exports = {getYesterdayDate};