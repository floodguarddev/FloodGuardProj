function convertMonthlyCountsToArrays(counts) {
    const monthYearArray = [];
    const countArray = [];
  
    counts.forEach(item => {
      const { month, year } = item._id;
      monthYearArray.push(`${getMonthName(month)} ${year}`);
      countArray.push(item.count);
    });
  
    return { monthYearArray, countArray };
}
  
function getMonthName(month) {
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
return monthNames[month - 1];
}

module.exports = {convertMonthlyCountsToArrays}