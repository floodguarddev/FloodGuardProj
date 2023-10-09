const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const Admin = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  adminPhotoLink: {
    type: String,
    default: null
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshTokens: {
    type: [Session],
  },
})

module.exports = mongoose.model("Admin", Admin)