const RoomRepository = require('../repositories/RoomRepository');
const UserRepository = require("../repositories/UserRepository");
const checkObjectId = require("../helpers/CheckObjectId");
class RoomService {
  constructor(){
    this.RoomRepository = new RoomRepository();
    this.UserRepository = new UserRepository();
  }
  async getRoomByPairOfUserId({relatingUserId, relatedUserId}){
    try {
      if (!checkObjectId(relatingUserId) || !checkObjectId(relatedUserId)){
        return errorCode.user_not_exist;
      }
      let room = await this.RoomRepository.getRoomByPairOfUserId({relatingUserId, relatedUserId});
      if (room) {
        let success = errorCode.success;
        success.data = room;
        return success;
      }
      const relatingUser = await this.UserRepository.getUserById(relatingUserId);
      const relatedUser = await this.UserRepository.getUserById(relatedUserId);
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