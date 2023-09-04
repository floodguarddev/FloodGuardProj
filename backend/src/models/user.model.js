const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  username: {
    type: String,
    required:true,
    unique: true
  },
  hash:{
    type: String,
    required: true
  },
  refreshToken: {
    type: [Session],
  },
})

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    delete ret.hash
    return ret
  },
})

module.exports = mongoose.model("User", User)