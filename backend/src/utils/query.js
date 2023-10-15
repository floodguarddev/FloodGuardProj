const moment = require("moment");

function arrayToNestedKey(array){
  let nestedKey = "";
  array.forEach(element => {
    nestedKey = nestedKey + element + ".";
  });
  nestedKey = nestedKey.slice(0, nestedKey.length-1);//Exclude last dot//
  return nestedKey;
}

function addDateQuery(key, mongooseQuery, queryJson) {
  let queryKey = key;
  if(Array.isArray(key)){
    queryKey = arrayToNestedKey(key)
    key = key[key.length-1]; 
  }

  if (
    !(
      queryJson[`${key}_eq`] ||
      queryJson[`${key}_gt`] ||
      queryJson[`${key}_lt`] ||
      queryJson[`${key}_gte`] ||
      queryJson[`${key}_lte`]
    )
  )
    return;
  let dateQuery = {};
  if (queryJson[`${key}_eq`]) {
    dateQuery.$gte = new Date(moment(queryJson[`${key}_eq`]).startOf("day").toDate());
    dateQuery.$lte = new Date(moment(queryJson[`${key}_eq`]).endOf("day").toDate());
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
  mongooseQuery[queryKey] = dateQuery;
}

function addNumberQuery(key, mongooseQuery, queryJson){
  let queryKey = key;
  if(Array.isArray(key)){
    queryKey = arrayToNestedKey(key)
    key = key[key.length-1]; 
  }


  if(!(queryJson[`${key}_eq`] 
  || queryJson[`${key}_gt`] 
  || queryJson[`${key}_lt`] 
  || queryJson[`${key}_gte`] 
  || queryJson[`${key}_lte`]))
      return;
  let numQuery = {};
  if(queryJson[`${key}_eq`]){
      numQuery.$eq = parseFloat(queryJson[`${key}_eq`])
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
  mongooseQuery[queryKey] = numQuery;
}

function addStringQuery(key, mongooseQuery, queryJson){
  let queryKey = key;
  if(Array.isArray(key)){
    queryKey = arrayToNestedKey(key)
    key = key[key.length-1]; 
  }

  if(queryJson[key]){
      mongooseQuery[queryKey] = {$regex: queryJson[key], $options : 'i'};
  }
}


function addBooleanQuery(key, mongooseQuery, queryJson){
  let queryKey = key;
  if(Array.isArray(key)){
    queryKey = arrayToNestedKey(key)
    key = key[key.length-1]; 
  }

  if(queryJson[key]){
      mongooseQuery[queryKey] = JSON.parse(queryJson[key])
  }
}

function addSimpleQuerySearch(fieldsArray, mongooseQuery, queryJson){
  //Check if Simple Query has beeen made or not//
  if(!queryJson.q)
    return false;

  let stringQuery =  {$regex: queryJson.q, $options : 'i'}

  simpleQuery = [];

  fieldsArray.forEach((fieldArr)=>{
    let field = arrayToNestedKey(fieldArr);
    simpleQuery.push({ [field]: stringQuery });
  })
  
  mongooseQuery.$or = simpleQuery;

  return true;
}

module.exports = {
  addDateQuery, addStringQuery, addBooleanQuery, addNumberQuery, addSimpleQuerySearch
};