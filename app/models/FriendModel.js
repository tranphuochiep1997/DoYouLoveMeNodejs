const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
  relatingUserId: { // facebookId
    type: String,
    ref: "User",
    index: true
  },
  relatedUserId: { // facebookId
    type: String,
    ref: "User",
    index: true
  },
  status: {
    // accepted: message accepted
    // pending: mesage is waiting for accept
    type: String,
    required: true
  },
  startDating: {
    type: Date
  }
}, {collection: "Friend"});
friendSchema.index({relatingUserId: 1, relatedUserId: 1}, {unique: true})
//Export
module.exports = mongoose.model("Friend", friendSchema);