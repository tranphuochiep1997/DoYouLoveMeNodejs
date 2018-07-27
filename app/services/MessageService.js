const MessageRepository = require('../repositories/MessageRepository');

class MessageService {
  constructor(){
    this.MessageRepository = new MessageRepository();
  }
  async getAllMessagesByRoomId(roomId){
    try {
      const messages = await this.MessageRepository.getAllMessagesByRoomId(roomId);
      let response = errorCode.success;
      response.data = messages;
      return response;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
}

module.exports = MessageService;