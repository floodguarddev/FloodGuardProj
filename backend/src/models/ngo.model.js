const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NGO = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    cnicNumber: {type: Number, required:true},
    address: {type: String, required:true},
    mobileNumber: {type: String, required: true},
    frontSideCNICLink: {type: String, required: true},
    backSideCNICLink: {type: String, required: true},
    ngoImageLink: {type: String},
    ngoName: {type: String, required: true},
    ngoContactNumber: {type: String, required: true},
    ngoId: {type:Number, required: true},
    registrationCertificateLink: {type:String , required: true},
    annualReportLink: {type: String, required: true},
    taxExemptionLink: {type: String, required: true},
    creditCardNumber: {type: String, required: true},
    fundRaisingPosts: {
        type: [{type: Schema.Types.ObjectId, ref:'Fund Raising Post'}],
        required: true,
        default: []
    },
    fundRaisingPostRequests: {
        type: [{type: Schema.Types.ObjectId, ref:'Fund Raising Post Request'}],
        required: true,
        default: []
    },
    ngoParticipationPosts: {
        type: [{type: Schema.Types.ObjectId, ref:'NGO Participation Post'}],
        required: true,
        default: []
    },
    ngoParticipationPostRequests: {
        type: [{type: Schema.Types.ObjectId, ref:'NGO Participation Post Request'}],
        required: true,
        default: []
    },
    approvedDate:  {
        type: Date,
        required: true,
        default: Date.now,
    },
    blocked: {
        type:Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("NGO", NGO)