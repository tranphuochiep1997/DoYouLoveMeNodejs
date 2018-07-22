const UserModel = require("../models/UserModel");
let {LIMIT} = require('../../config');
const getPictureUrlFacebook = require("../helpers/getPictureUrlFacebook");

class UserRepository {
  constructor(){
    this.UserModel = UserModel;
  }
  async add({name = "", facebookId, about="", status="", birthday = null, gender = null, email=null, picture=null}){
    return await this.UserModel.create({
      name,
      facebookId,
      about,
      status,
      birthday,
      gender, // 0: female, 1: male, 2: undefined
      email,
      picture: picture || getPictureUrlFacebook(facebookId)
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
    let {facebookId: x, ...userWithoutFacebookId} = user;
    return await this.UserModel.findOneAndUpdate({facebookId: facebookId}, userWithoutFacebookId, {new: true});
  }
}

module.exports = UserRepository;