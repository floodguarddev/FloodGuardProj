const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Flood_Report = new Schema({
  userId:{ 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    unique: true, 
    required: true },
  district: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Flood Report', Flood_Report);