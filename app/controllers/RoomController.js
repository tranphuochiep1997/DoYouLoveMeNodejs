const Controller = require("./Controller");
const RoomService = require("../services/RoomService");

class RoomController extends Controller {
  constructor(){
    super();
    this.RoomService = new RoomService;
  }
  async getRoomByPairOfUserId(req, res){
    let result = await this.RoomService.getRoomByPairOfUserId({relatingUserId: req.userId, relatedUserId: req.params.relatedUserId});
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = RoomController;