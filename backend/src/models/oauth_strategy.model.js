const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Oauth_Strategy = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  accessToken: {
    type: String,
    required: true,
  }
})


module.exports = mongoose.model("Oauth_Strategy", Oauth_Strategy)