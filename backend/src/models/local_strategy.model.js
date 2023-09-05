const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Local_Strategy = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  hashedPassword: {
    type: String,
    required: true,
  }
})

//Remove refreshToken from the response
// User.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.refreshToken
//     delete ret.hash
//     return ret
//   },
// })

module.exports = mongoose.model("Local_Strategy", Local_Strategy)