const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Flood_Precaution = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  precautions: [{
    type: String,
    required: true,
  }],
})

module.exports = mongoose.model('Flood Precaution', Flood_Precaution);;