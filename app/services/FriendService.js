const FriendRepository = require('../repositories/FriendRepository');
const UserRepository = require("../repositories/UserRepository");
class FriendService {
  constructor(){
    this.FriendRepository = new FriendRepository();
    this.UserRepository = new UserRepository();
  }
  async makeFriend(body){
    const {relatingUserId, relatedUserId} = body;
    if (relatingUserId == relatedUserId) {
      return errorCode.friend_itself;
    }
    
    const relatingUser = await this.UserRepository.getByFacebookId(relatingUserId);
    const relatedUser = await this.UserRepository.getByFacebookId(relatedUserId);
    if (!relatingUser || !relatedUser) {
      return errorCode.user_not_exist;
    }

    const alreadyRelatedFriend = await this.FriendRepository.getFriendByPairOfFacebookId({relatingUserId, relatedUserId});
    if (alreadyRelatedFriend) {
      errorCode.friend_established.data = alreadyRelatedFriend;
      return errorCode.friend_established;
    }

    const relatingFriendCreated = await this.FriendRepository.add({relatingUserId, relatedUserId, status: "pending"});
    const relatedFriendCreated = await this.FriendRepository.add({relatingUserId: relatedUserId, relatedUserId: relatingUserId, status: "received"});
    
    if (relatingFriendCreated && relatedFriendCreated) {
      let success = errorCode.success;
      success.data = relatingFriendCreated;
      return success;
    }
    if (relatingFriendCreated){
      this.FriendRepository.deleteFriend(relatingFriendCreated._id);
    }
    if (relatedFriendCreated){
      this.FriendRepository.deleteFriend(relatedFriendCreated._id);
    }
    return errorCode.unexpected_error;
  }
  async getAllFriendsByFacebookId(facebookId, {status = null}){
    const user = await this.UserRepository.getByFacebookId(facebookId);
    if (!user) {
      return errorCode.user_not_exist;
    }
    const friends = await this.FriendRepository.getAllFriendsByFacebookId(facebookId, {status: status});
    let success = {
      error: errorCode.success.error,
      message: errorCode.success.message,
      data: friends
    }
    return success;
  }
  async getFriendById(id){
    const friend = await this.FriendRepository.getById(id);
    if (!friend) {
      return errorCode.user_not_exist;
    }
    let success = errorCode.success;
    success.data = friend;
    return success;
  }
  async updateFriend(id, body){
    const friend = await this.FriendRepository.getById(id);
    if (!friend) {
      return errorCode.user_not_exist;
    }
    const updatedFriend = await this.FriendRepository.updateById(id, body);
    let success = errorCode.success;
    success.data = updatedFriend;
    return success;
  }
}

module.exports = FriendService;