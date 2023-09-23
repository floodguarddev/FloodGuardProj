const mongoose = require('mongoose');
const Schema = mongoose.Schema

const News = new Schema({
  title: {
    type: String,
    required: true,
  },
  author:{
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
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
  content: {
    type: String
  }
});


module.exports = mongoose.model('News', News);;