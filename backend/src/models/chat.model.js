const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Chat = Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model('Chat', Chat);