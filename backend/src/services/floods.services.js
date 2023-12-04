const createHttpError = require('http-errors');
const floodModel = require('../models/flood.model');
const { getAddress } = require('../utils/location');
async function getFloods(){
    let floods = floodModel.find({});
    return floods;
}
//Edit
async function getSpecificFlood(id){
    let flood = floodModel.findById(id);

    if(!flood)
    {
        throw new createHttpError.NotFound(`Flood with given id ${id} doesn't exist`);
    }

    return flood
}
//Add
async function reportFlood(userId, lat, lng){

}

async function predictFlood(lat, lng){
    let address = await getAddress(lat, lng);

    let prediction = false;

    return {address, prediction};
}
async function addFlood(date, description, districts){
    let flood = await floodModel.create({date, description, districts});

    return flood;
}

async function editFlood(id, date, description, districts){
    let flood = await floodModel.findByIdAndUpdate(id, {date, description, districts}, {new: true});

    if(!flood)
    {
        throw new createHttpError.NotFound(`Flood with given id ${id} doesn't exist`);
    }

    return flood;
}

async function deleteFlood(id){
    let flood = await floodModel.findByIdAndDelete(id);
    console.log('deleting');
    if(!flood)
    {
        throw new createHttpError.NotFound(`Flood with given id ${id} doesn't exist`);
    }

    return flood;
}

async function getFloodPredictionHeatmap(){
    let districts = ["Isalamabad", "Rawalpindi"];

    return districts;
}

module.exports = {getFloods, getSpecificFlood, reportFlood, predictFlood, addFlood, editFlood, deleteFlood, getFloodPredictionHeatmap}