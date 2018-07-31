const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomId: { // equal friend Id
    type: Schema.Types.ObjectId, 
    ref: "Room",
    required: true
  }, 
  sender: { 
    type: Schema.Types.ObjectId,
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