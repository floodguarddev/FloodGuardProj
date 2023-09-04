const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Flood = new Schema({
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

Flood.index({ location: '2dsphere' });

module.exports = mongoose.model('Flood', Flood);