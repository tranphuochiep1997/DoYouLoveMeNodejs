const MessageRepository = require('../repositories/MessageRepository');
const RoomRepository = require('../repositories/RoomRepository');
const checkObjectId = require("../helpers/CheckObjectId");

class MessageService {
  constructor(){
    this.MessageRepository = new MessageRepository();
    this.RoomRepository = new RoomRepository();
  }
  async getAllMessagesByRoomId(req){
    try {
      const roomId = req.query.roomId;
      const userId = req.userId; 
      if (!checkObjectId(roomId)){
        return errorCode.room_not_exist
      }
      const room = await this.RoomRepository.getRoomById(roomId);
      if (room.relatingUserId === userId  || room.relatedUserId !== userId){
        const messages = await this.MessageRepository.getAllMessagesByRoomId({roomId, page: req.query.page});
        let response = errorCode.success;
        response.data = messages;
        return response;
      }
      return errorCode.unauthorized;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
}

module.exports = MessageService;