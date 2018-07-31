const RoomModel = require("../models/RoomModel");

class RoomRepository {
  constructor(){
    this.RoomModel = RoomModel;
  }
  async create({relatingUserId, relatedUserId}){
    return await this.RoomModel.create({
      relatingUserId,
      relatedUserId
    });
  }

  async getRoomByPairOfUserId({relatingUserId, relatedUserId}){
    return await this.RoomModel.findOne({$or: [
      {relatingUserId: relatingUserId, relatedUserId: relatedUserId}, 
      {relatingUserId: relatedUserId, relatedUserId: relatingUserId}
    ]});
  }
  async getAllRoomsByUserId(id){
    return await this.RoomModel.find({$or: [
      {relatingUserId: id},
      {relatedUserId: id},
    ]});
  }
  async getRoomById(id){
    return await this.RoomModel.findById(id);
  }
}

module.exports = RoomRepository;