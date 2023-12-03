const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Flood = new Schema({
  date: {
    type: Date,
    required: true,
    default:  Date.now
  },
  districts: {
    type:[String],
    required:true,
  },
  description:{
      type: String,
      required: true,
  }
});

module.exports = mongoose.model('Flood', Flood);