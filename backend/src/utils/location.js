const { default: axios } = require("axios");

async function getAddress(lat, lon){

    let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`);

    if(!response.data.address){
        return null;
    }
    let addressArray = Object.values(response.data.address)
    return addressArray
}

module.exports = {getAddress}