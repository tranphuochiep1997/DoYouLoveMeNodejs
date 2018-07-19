const Controller = require("./Controller");
const UserService = require("../services/UserService");
const FriendService = require("../services/FriendService");

class UserController extends Controller {
  constructor(){
    super();
    this.UserService = new UserService;
    this.FriendService = new FriendService;
  }
  async postUser(req, res){
    let result = await this.UserService.createNewUser(req.body);
    if (!result.error){
      return this.createdResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async putUserByFacebookId(req, res) {
    let result = await this.UserService.updateUserByFacebookId(req.params.id, req.body);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getUserByFacebookId(req, res){
    let result = await this.UserService.getUserByFacebookId(req.params.id);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getAllFriendsByFacebookId(req, res){
    let status = req.query.status || null;
    let result = await this.FriendService.getAllFriendsByFacebookId(req.params.id, {status: status});
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async getAllUser(req, res){
    let result = await this.UserService.getAllUser(req.query.page);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = UserController;