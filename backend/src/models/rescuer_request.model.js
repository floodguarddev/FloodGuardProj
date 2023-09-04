const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Rescuer_Request = new Schema({
    userID:{ type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    cnicNumber: {type: Number, required:true},
    address: {type: String, required:true},
    rescuerImageLink: {type: String},
    mobileNumber: {type: String, required: true},
    frontSideCNICLink: {type: String, required: true},
    backSideCNICLink: {type: String, required: true},
    rescuerApprovalLink: {type: String, required:true},
    registrationDate:  {
        type: Date,
        required: true,
        default: Date.now,
    }
})

module.exports = mongoose.model("Rescuer Request", Rescuer_Request)