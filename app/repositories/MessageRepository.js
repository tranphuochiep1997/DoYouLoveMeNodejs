const MessageModel = require("../models/MessageModel");

class MessageRepository {
  constructor(){
    this.MessageModel = MessageModel;
  }
  async add({friendId, body, sender}){
    return await this.MessageModel.create({
      friendId,
      body,
      sender
    });
  }
  async getById(id){
    return await this.MessageModel.findById(id);
  }
  async getAllMessagesByFriendId(friendId){
    return await this.MessageModel.find({friendId: friendId}, null, {sort: {_id: -1}});
  }
  async update(id, body){
    return await this.MessageModel.findByIdAndUpdate(id, body);
  }
}

module.exports = MessageRepository;