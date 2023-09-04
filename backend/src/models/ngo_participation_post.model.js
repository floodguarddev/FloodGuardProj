const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NGO_Participation_Post = new Schema({
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
    postImagesLinks: 
    {
        type: [{type:String}],
        required: true,
        default: [],
    }
})

module.exports = mongoose.model("NGO Participation Post", NGO_Participation_Post)