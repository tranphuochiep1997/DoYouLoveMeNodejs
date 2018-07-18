const FriendModel = require("../models/FriendModel");

class FriendRepository {
  constructor(){
    this.FriendModel = FriendModel;
  }
  async add({relatingUserId, relatedUserId, status, startDating = null}){
    return await this.FriendModel.create({
      relatingUserId,
      relatedUserId,
      status,
      startDating
    });
  }
  async getById(id){
    return await this.FriendModel.findById(id);
  }
  async getByFacebookId(facebookId){
    return await this.FriendModel.findOne({facebookId: facebookId});
  }
  // Get all friends by facebook id
  async getAllFriendsByFacebookId(facebookId){
    return await this.FriendModel.find({relatingUserId: facebookId});
  }
  async deleteFriend(friendId) {
    return await this.FriendModel.findByIdAndRemove(friendId);
  }
}

module.exports = FriendRepository;