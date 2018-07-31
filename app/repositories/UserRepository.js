const UserModel = require("../models/UserModel");
const {LIMIT} = require('../../config');
const bcrypt = require("bcryptjs");
const {DEFAULT_IMG} = require("../../config");

class UserRepository {
  constructor(){
    this.UserModel = UserModel;
  }
  async add({email, password, name = "", about="", status="", birthday = "", gender = "", picture=""}){
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.UserModel.create({
        email,
        password: hashedPassword,
        name,
        about,
        status,
        birthday,
        gender, 
        picture: picture || DEFAULT_IMG
      });
    } catch(err){
      console.log(err);
    }
  }
  async getUserById(id){
    return await this.UserModel.findById(id);
  }
  async getUserByEmail(email){
    return await this.UserModel.findOne({email});
  }
  async getAll({page=0, search=""}){
    if (search.trim()){
      return await this.UserModel.find({name: {$regex: search, $options: 'i'}}, "-password -email", {limit: LIMIT, skip: page*LIMIT});
    }
    return await this.UserModel.find({}, "-password -email", {limit: LIMIT, skip: page*LIMIT});
  }
  async updateUserById(id, user){
    return await this.UserModel.findByIdAndUpdate(id, user, {new: true});
  }
}

module.exports = UserRepository;