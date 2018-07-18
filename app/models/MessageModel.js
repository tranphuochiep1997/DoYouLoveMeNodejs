const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  friendId: {
    type: Schema.Types.ObjectId,
    ref: "Friend",
    required: true
  }, 
  sender: { // facebookId
    type: String,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  }
}, {collection: "Message"});

//Export
module.exports = mongoose.model("Message", messageSchema);