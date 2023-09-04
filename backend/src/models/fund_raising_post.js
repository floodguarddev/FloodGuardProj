const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Fund_Raising_Post = new Schema({
    postedDate:  {
        type: Date,
        required: true,
        default: Date.now,
    },
    postTitle: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
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
        type: {type: Schema.Types.ObjectId, ref: 'Flood'},
        required: true,
        default: null
    },
    transactions:
    {
        type: [{type: Schema.Types.ObjectId, ref: "Transaction"}],
        required: true,
        default: []
    }
})

module.exports = mongoose.model("Fund Raising Post", Fund_Raising_Post)