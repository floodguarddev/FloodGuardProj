export function jsonToSearchQuery(jsonQuery){
    let stringQuery = "";
    Object.keys(jsonQuery).forEach((key)=>{
        if(jsonQuery[key] === undefined || jsonQuery[key] === null)
            return
        
            stringQuery = stringQuery+key + "=" +jsonQuery[key]+"&"
    })
    stringQuery = stringQuery.slice(0, stringQuery.length - 1);

    return stringQuery;
}