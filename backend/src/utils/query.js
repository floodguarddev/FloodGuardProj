const moment = require("moment");

function addDateQuery(key, mongooseQuery, queryJson) {
  if (
    !(
      queryJson[`${key}`] ||
      queryJson[`${key}_gt`] ||
      queryJson[`${key}_lt`] ||
      queryJson[`${key}_gte`] ||
      queryJson[`${key}_lte`]
    )
  )
    return;
  let dateQuery = {};
  if (queryJson[`${key}`]) {
    dateQuery.$gte = new Date(queryJson[key]);
    dateQuery.$lte = new Date(moment(queryJson[key]).endOf("day").toDate());
  }
  if (queryJson[`${key}_gt`]) {
    dateQuery.$gt = new Date(queryJson[`${key}_gt`]);
  }
  if (queryJson[`${key}_lt`]) {
    dateQuery["$lt"] = new Date(queryJson[`${key}_lt`]);
  }
  if (queryJson[`${key}_gte`]) {
    dateQuery["$gte"] = new Date(queryJson[`${key}_gte`]);
  }
  if (queryJson[`${key}_lte`]) {
    dateQuery["$lte"] = new Date(queryJson[`${key}_lte`]);
  }
  mongooseQuery[key] = dateQuery;
}

function addNumberQuery(key, mongooseQuery, queryJson){
  if(!(queryJson[`${key}`] 
  || queryJson[`${key}_gt`] 
  || queryJson[`${key}_lt`] 
  || queryJson[`${key}_gte`] 
  || queryJson[`${key}_lte`]))
      return;
  let numQuery = {};
  if(queryJson[`${key}`]){
      numQuery.$eq = parseFloat(queryJson[key])
  }
  if(queryJson[`${key}_gt`]){
      numQuery.$gt = parseFloat(queryJson[`${key}_gt`])
  }
  if(queryJson[`${key}_lt`]){
      numQuery.$lt = parseFloat(queryJson[`${key}_lt`])
  }
  if(queryJson[`${key}_gte`]){
      numQuery.$gte = parseFloat(queryJson[`${key}_gte`])
  }
  if(queryJson[`${key}_lte`]){
      numQuery.$lte= parseFloat(queryJson[`${key}_lte`])
  }
  mongooseQuery[key] = numQuery;
}

function addStringQuery(key, mongooseQuery, queryJson){

  if(queryJson[key]){
      mongooseQuery[key] = {$regex: queryJson[key], $options : 'i'};
  }
}


function addBooleanQuery(key, mongooseQuery, queryJson){
  if(queryJson[key]){
      mongooseQuery[key] = JSON.parse(queryJson[key])
  }
}


module.exports = {
  addDateQuery, addStringQuery, addBooleanQuery, addNumberQuery
};