const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  facebookId: {
    type: String,
    unique: true
  },
  age: Number,
  gender: Number, // 0: female, 1: male, 2: undefined
  avatar: String
}, {collection: "User"});

//Export
module.exports = mongoose.model("User", userSchema);