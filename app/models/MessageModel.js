const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomId: { // equal friend Id
    // type: Schema.Types.ObjectId, 
    type: String, // Change this when login with user name password
    ref: "Room",
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