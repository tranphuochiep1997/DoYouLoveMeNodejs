const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  name: String,
  about: String,
  status: String,
  birthday: Date,
  gender: String, 
  picture: String
}, {collection: "User"});

//Export
module.exports = mongoose.model("User", userSchema);