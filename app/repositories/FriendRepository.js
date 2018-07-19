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
  async updateById(id, friend){
    let {status, startDating} = friend;
    return await this.FriendModel.findByIdAndUpdate(id, {status, startDating}, {new: true});
  }
  async getById(id){
    return await this.FriendModel.findById(id);
  }
  async getFriendByPairOfFacebookId({relatingUserId, relatedUserId}){
    return await this.FriendModel.findOne({relatingUserId, relatedUserId});
  }
  // Get all friends by facebook id
  async getAllFriendsByFacebookId(facebookId, {status = null}){
    if (!status){
    return await this.FriendModel.find({relatingUserId: facebookId});
    }
    return await this.FriendModel.find({relatingUserId: facebookId, status: status});
  }
  async deleteFriend(friendId) {
    return await this.FriendModel.findByIdAndRemove(friendId);
  }
}

module.exports = FriendRepository;