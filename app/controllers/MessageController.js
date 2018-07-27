const Controller = require("./Controller");
const MessageService = require("../services/MessageService");

class MessageController extends Controller {
  constructor(){
    super();
    this.MessageService = new MessageService;
  }
  async getAllMessagesByRoomId(req, res){
    let result = await this.MessageService.getAllMessagesByRoomId(req.query.roomId);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = MessageController;