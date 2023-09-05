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
  username: {
    type: String,
    required: true,
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
})

module.exports = mongoose.model("Admin", Admin)