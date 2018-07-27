const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  relatingUserId: { // facebookId
    type: String,
    ref: "User",
    index: true
  },
  relatedUserId: { // facebookId
    type: String,
    ref: "User",
    index: true
  }
}, {collection: "Room"});
roomSchema.index({relatingUserId: 1, relatedUserId: 1}, {unique: true});
//Export
module.exports = mongoose.model("Room", roomSchema);