const Controller = require("./Controller");
const UserService = require("../services/UserService");
const FriendService = require("../services/FriendService");

class UserController extends Controller {
  constructor(){
    super();
    this.UserService = new UserService;
    this.FriendService = new FriendService;
  }
  async putUserById(req, res) {
    let result = await this.UserService.updateUserById(req);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getAllFriendsByUserId(req, res){
    if (req.params.id !== req.userId){
      return this.inValidResponse(res, errorCode.invalid_token);
    }
    let status = req.query.status || null;
    let result = await this.FriendService.getAllFriendsByUserId(req.params.id, {status: status});
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getAllUser(req, res){
    let result = await this.UserService.getAllUser(req);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getUserById(req, res){
    let result = await this.UserService.getUserById(req);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = UserController;