const MessageModel = require("../models/MessageModel");
const {LIMIT_MESSAGE} = require('../../config');

class MessageRepository {
  constructor(){
    this.MessageModel = MessageModel;
  }
  async add({roomId, body, sender}){
    return await this.MessageModel.create({
      roomId,
      body,
      sender
    });
  }
  async getById(id){
    return await this.MessageModel.findById(id);
  }
  async getAllMessagesByRoomId({roomId, page=0}){
    return await this.MessageModel.find({roomId: roomId}, null, {limit: LIMIT_MESSAGE, skip: page*LIMIT_MESSAGE, sort: {_id: -1}});
  }
  async update(id, body){
    return await this.MessageModel.findByIdAndUpdate(id, body);
  }
}

module.exports = MessageRepository;