const UserModel = require("../models/UserModel");
let {LIMIT} = require('../../config');

class UserRepository {
  constructor(){
    this.UserModel = UserModel;
  }
  async add({name = "", facebookId, age = null, gender = null, avartar = ""}){
    
    return await this.UserModel.create({
      name, 
      facebookId, 
      age, 
      gender, 
      avartar
    });
  }
  async getById(id){
    return await this.UserModel.findById(id);
  }
  async getByFacebookId(facebookId){
    return await this.UserModel.findOne({facebookId: facebookId});
  }
  async getAll(page){
    if (!page){
      LIMIT = 0;
      page = 0;
    }
    return await this.UserModel.find({}, null, {limit: LIMIT, skip: page*LIMIT});
  }
  async update(id, user){
    return await this.UserModel.findByIdAndUpdate(id, user);
  }
  async updateByFacebookId(facebookId, user){
    return await this.UserModel.findOneAndUpdate({facebookId: facebookId}, user, {new: true});
  }
}

module.exports = UserRepository;