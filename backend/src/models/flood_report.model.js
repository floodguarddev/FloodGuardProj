const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Flood_Report = new Schema({
  userID:{ type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  level: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  imagesLinks: {
    type: [{type: String}],
    required: true,
    default: []
  },
  description: {
    type: String,
    required: true,
  },
});

Flood_Report.index({ location: '2dsphere' });

module.exports = mongoose.model('Flood Report', Flood_Report);