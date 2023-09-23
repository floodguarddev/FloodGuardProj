const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Fund_Raising_Post_Request = new Schema({
    requestDate:  {
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
    }
})

module.exports = mongoose.model("Fund Raising Post Request", Fund_Raising_Post_Request)