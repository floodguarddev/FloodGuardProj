const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Rescuer = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    cnicNumber: {type: Number, unique: true, required:true},
    address: {type: String, required:true},
    rescuerImageLink: {type: String, required:true},
    mobileNumber: {type: String, unique: true, required: true},
    frontSideCNICLink: {type: String, required: true},
    backSideCNICLink: {type: String, required: true},
    rescuerApprovalLink: {type: String, required:true},
    requestCameras: {
        type: [{type:Schema.Types.ObjectId, ref: 'Camera Request'}],
        required: true,
        default: []
    },
    installedCameras: {
        type: [{type:Schema.Types.ObjectId, ref: 'Camera'}],
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

module.exports = mongoose.model("Rescuer", Rescuer)