const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  about: String,
  status: String,
  facebookId: {
    type: String,
    unique: true
  },
  birthday: Date,
  email: String,
  gender: Number, // 0: female, 1: male, 2: undefined
  picture: String
}, {collection: "User"});

//Export
module.exports = mongoose.model("User", userSchema);