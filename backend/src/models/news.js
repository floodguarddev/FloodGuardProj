const mongoose = require('mongoose');
const Schema = mongoose.Schema

const News = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagesLinks: {
    type: [{type: String}],
    required: true,
    default: []
  },
  relatedNews: {
    type: [{type: Schema.Types.ObjectId, ref: "News"}],
    required: true,
    default: []
  },
  relatedFloods: {
    type: [{type: Schema.Types.ObjectId, ref: "Flood"}],
    required: true,
    default: []
  },
  publishedAt: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model('News', News);;