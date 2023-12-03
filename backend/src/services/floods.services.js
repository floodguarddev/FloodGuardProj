
async function viewFloods(){
    let floods = floodModel.find({});
    
    return floods
}
//Edit
async function viewSpecificFlood(id){
    let flood = floodModel.findById(id);
    return flood
}
//Add
async function reportFlood(userId, lat, lng){
    
}

async function predictFlood(lat, lng){
    let predict;

    return flood;
}
async function addFlood(date, description, cityNames){
    let flood;

    return flood;
}

async function editFlood(id, date, description, cityNames){
    let flood;

    return flood;
}

async function deleteFlood(id){
    let flood;

    return flood;
}

async function currentDistrictsFloodStatus(){
    let cityFloods;

    return cityFloods;
}

module.exports = {viewFloods, viewSpecificFlood, reportFlood, predictFlood, addFlood, editFlood, deleteFlood, currentDistrictsFloodStatus}