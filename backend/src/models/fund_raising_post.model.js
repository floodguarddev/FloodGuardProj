const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Fund_Raising_Post = new Schema({
    postedDate:  {
        type: Date,
        required: true,
        default: Date.now,
    },
    ngoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "NGO"
    },
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    recievedAmount: {
        type: Number,
        required: true,
        default: 0
    },
    requestedAmount: {
        type: Number,
        required: true
    },
    postImagesLinks: 
    {
        type: [{type:String}],
        required: true,
        default: [],
    },
    relatedFlood:{
        type: Schema.Types.ObjectId,
        ref: 'Flood',
        default: null
    },
    transactions:
    {
        type: [{type: Schema.Types.ObjectId, ref: "Transaction"}],
        required: true,
        default: []
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("Fund Raising Post", Fund_Raising_Post)