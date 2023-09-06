const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Transaction = new Schema({
    transactionId: {type:String, require: true, unique: true},
    transactionDate: {type: Date, require: true, default: Date.now()},
    amount: {type: Number, required: true}, //Donation should be stored in PKR
    sender: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
    reciever: {type: Schema.Types.ObjectId, require: true, ref: 'NGO'}
})

module.exports = mongoose.model("Transaction", Transaction)