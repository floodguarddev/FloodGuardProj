const createHttpError = require("http-errors");
const { filePathToFileUrl } = require("./fileHandling");

async function getSingleFileUrlRequired(key, filesObj){
    if(!filesObj[key])
        throw new createHttpError.BadRequest(`${key} field is missing`);
    let fileUrl = filePathToFileUrl(filesObj[key][0].path);
    return fileUrl;
}

async function getSingleFileUrl(key, filesObj){
    try{
        let fileUrl = filePathToFileUrl(filesObj[key][0].path);
        return fileUrl
    }
    catch(error)
    {
        return undefined
    }
}

module.exports = {getSingleFileUrlRequired, getSingleFileUrl};