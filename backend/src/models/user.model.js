const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema({
  name: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  verified: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required:true,
    unique: true
  },
  refreshTokens: {
    type: [Session],
  },
})

//Remove refreshTokens from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshTokens
    return ret
  },
})

module.exports = mongoose.model("User", User)