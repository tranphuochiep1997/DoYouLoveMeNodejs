const FriendRepository = require('../repositories/FriendRepository');
const UserRepository = require("../repositories/UserRepository");
class FriendService {
  constructor(){
    this.FriendRepository = new FriendRepository();
    this.UserRepository = new UserRepository();
  }
  async makeFriend(body){
    const {relatingUserId, relatedUserId} = body;
    const relatingUser = await this.UserRepository.getByFacebookId(relatingUserId);
    const relatedUser = await this.UserRepository.getByFacebookId(relatedUserId);
    if (!relatingUser || !relatedUser) {
      return errorCode.user_not_exist;
    }
    const relatingFriendCreated = await this.FriendRepository.add({relatingUserId, relatedUserId, status: "accepted"});
    const relatedFriendCreated = await this.FriendRepository.add({relatedUserId, relatingUserId, status: "pending"});
    if (relatingFriendCreated && relatedFriendCreated) {
      errorCode.success.data = relatingFriendCreated;
      return errorCode.success;
    }
    if (relatingFriendCreated){
      this.FriendRepository.deleteFriend(relatingFriendCreated._id);
    }
    if (relatedFriendCreated){
      this.FriendRepository.deleteFriend(relatedFriendCreated._id);
    }
    return errorCode.unexpected_error;
  }
}

module.exports = FriendService;