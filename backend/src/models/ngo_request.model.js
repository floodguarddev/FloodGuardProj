const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NGO_Request = new Schema({
    userID:{ type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    cnicNumber: {type: Number, required:true},
    address: {type: String, required:true},
    ngoImageLink: {type: String},
    mobileNumber: {type: String, required: true},
    frontSideCNICLink: {type: String, required: true},
    backSideCNICLink: {type: String, required: true},
    ngoName: {type: String, required: true},
    ngoContactNumber: {type: String, required: true},
    ngoID: {type:Number, required: true},
    registrationCertificateLink: {type:String , required: true},
    annualReportLink: {type: String, required: true},
    taxExemptionLink: {type: String, required: true},
    creditCardNumber: {type: String, required: true},
    registrationDate:  {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("NGO Request", NGO_Request);