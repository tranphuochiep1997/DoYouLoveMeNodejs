const Controller = require("./Controller");
const FriendService = require("../services/FriendService");

class FriendController extends Controller {
  constructor(){
    super();
    this.FriendService = new FriendService;
  }
  async postFriend(req, res){
    let result = await this.FriendService.makeFriend(req.body);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getFriendById(req, res) {
    let result = await this.FriendService.getFriendById(req.params.id);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async putFriend(req, res){
    let result = await this.FriendService.updateFriend(req.params.id, req.body);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = FriendController;