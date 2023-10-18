
function convertMonthlyFieldsToArray(fields, counts){
  fieldsCountArrays = {}
  for(let i = 0; i<fields.length; i++){
    const x = [];
    const y = [];

    let filledCounts = addFieldsMissingMonthlyCount(fields[i], counts);

    filledCounts.forEach(item => {
      const { month, year } = item._id;
      x.push(`${getMonthName(month)} ${year}`);
      y.push(item[fields[i]]);
    });
    fieldsCountArrays[fields[i]] = {x, y}
  }
  return fieldsCountArrays;
}


function addFieldsMissingMonthlyCount(fieldName, counts){
  // Generate an array with all 12 months and years
  currentDate = new Date();
  const allMonths = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    allMonths.unshift({
      _id: {
        month: date.getMonth() + 1, // Months are zero-based in JavaScript
        year: date.getFullYear(),
      },
      [fieldName]: 0, // Initialize the count to 0
    });
  }


  // Left join the aggregation result with the allMonths array
  const newCounts = allMonths.map((monthYear) => {
    const match = counts.find((item) => {
      return (
        item._id.month === monthYear._id.month &&
        item._id.year === monthYear._id.year
      );
    });
    return match || monthYear;
  });

  return newCounts;
}


function convertLast7DaysFieldsToArray(fields, counts) {
  fieldsCountArrays = {}
  for(let i = 0; i<fields.length; i++){
    const x = [];
    const y = [];

    let filledCounts = addFieldsMissingLast7DaysCount(fields[i], counts);

    filledCounts.forEach(item => {
      const { day } = item._id;
      x.push(`${getWeekDayName(day)}`);
      y.push(item[fields[i]]);
    });
    fieldsCountArrays[fields[i]] = {x, y}
  }
  return fieldsCountArrays;
}

function addFieldsMissingLast7DaysCount(field, counts){
  // Generate an array with all 12 months and years
  currentDate = new Date();
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
    weekDays.unshift({
      _id: {
        month: date.getMonth() + 1, // Months are zero-based in JavaScript
        year: date.getFullYear(),
        date: date.getDate()-1,
        day: date.getDay()?date.getDay():7
      },
      [field]: 0, // Initialize the count to 0
    });
  }
  // Left join the aggregation result with the allMonths array
  const newCounts = weekDays.map((week) => {
    const match = counts.find((item) => {
      return (
        item._id.month === week._id.month &&
        item._id.year === week._id.year &&
        item._id.date === week._id.date &&
        item._id.day === week._id.day 
      );
    });
    return match || week;
  });

  return newCounts;
}

function convertYearlyFieldsToArray(fields, counts){
    fieldsCountArrays = {};
    for(let i = 0; i<fields.length; i++){
    const x = [];
    const y = [];

    let filledCounts = addFieldsMissingYearlyCount(fields[i], counts);

    filledCounts.forEach(item => {
      const { year } = item._id;
        x.push(`${year}`);
      y.push(item[fields[i]]);
    });
    fieldsCountArrays[fields[i]] = {x, y}
  }
  
  return fieldsCountArrays;
}

function addFieldsMissingYearlyCount(field, counts){
  // Generate an array with all 12 months and years
  currentDate = new Date();
  const allYears = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(currentDate.getFullYear()-i,0, 1);
    allYears.unshift({
      _id: {
        year: date.getFullYear(),
      },
      [field]: 0, // Initialize the count to 0
    });
  }

  
  // Left join the aggregation result with the allMonths array
  const newCounts = allYears.map((year) => {
    const match = counts.find((item) => {
      return (
        item._id.year === year._id.year
      );
    });
    return match||year;
  });

  return newCounts;
}

function getLastYearCompare(counts){
    let currentYear = new Date().getFullYear();

    let currentYearCounts = counts.find(item=>item._id.year==currentYear)? counts.find(item=>item._id.year==currentYear).count:0;
    let prevYearCounts = counts.find(item=>item._id.year==(currentYear-1))? counts.find(item=>item._id.year==(currentYear-1)).count : 0;

    let lastYearCompare;

    if(currentYearCounts == 0 && prevYearCounts==0){
        lastYearCompare = 0
    }
    else if(currentYearCounts == 0){
        lastYearCompare = -100
    }
    else if(prevYearCounts == 0){
        lastYearCompare = 100
    }
    else{
        lastYearCompare = Math.floor((currentYearCounts)*100/prevYearCounts);
    }
    return lastYearCompare;
}

function getMonthName(month) {
  const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return monthNames[month - 1];
}

function getWeekDayName(day){
  const DaysNames = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  return DaysNames[day-1]
}



module.exports = {convertLast7DaysFieldsToArray, convertYearlyFieldsToArray, convertMonthlyFieldsToArray, getLastYearCompare,
  }