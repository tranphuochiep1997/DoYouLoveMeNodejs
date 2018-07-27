const RoomRepository = require('../repositories/RoomRepository');
const UserRepository = require("../repositories/UserRepository");

class RoomService {
  constructor(){
    this.RoomRepository = new RoomRepository();
    this.UserRepository = new UserRepository();
  }
  async getRoomByPairOfUserId(pairOfUserId){
    try {
      const {relatingUserId, relatedUserId} = pairOfUserId;
      let room = await this.RoomRepository.getRoomByPairOfUserId({relatingUserId, relatedUserId});
      if (room) {
        let success = errorCode.success;
        success.data = room;
        return success;
      }
      const relatingUser = await this.UserRepository.getByFacebookId(relatingUserId);
      const relatedUser = await this.UserRepository.getByFacebookId(relatedUserId);
      if (!relatingUser || !relatedUser) {
        return errorCode.user_not_exist;
      }
      room = await this.RoomRepository.create({relatingUserId, relatedUserId});
      let success = errorCode.success;
      success.data = room;
      return success;
  } catch(err){
    console.log(err);
    return errorCode.unexpected_error;
  }
  }
}

module.exports = RoomService;