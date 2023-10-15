let Admin = require('./../models/admin.model');
const createHttpError = require('http-errors');

async function getAdminUsingEmail(email){
    let admin = await Admin.findOne({email}).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );

    return admin
}

async function isAdminAvailableUsingEmail(email){
    let admin = await getAdminUsingEmail(email);

    return (admin != null);
}

async function getAdminById(id){
    let admin = await Admin.findById(id).catch(error => {
        throw new createHttpError.InternalServerError(error);
    }
    );
    
    return admin
}

async function getAdminsByQuery(query, limit = process.env.DEFAULT_LIMIT, offset = 0){
    let admins = await Admin.find(query).skip(offset).limit(limit);
    const total = await Admin.countDocuments(query);
    return {total, admins};
}

module.exports = {getAdminUsingEmail, getAdminById, isAdminAvailableUsingEmail, getAdminsByQuery}