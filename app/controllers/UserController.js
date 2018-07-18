const Controller = require("./Controller");
const UserService = require("../services/UserService");

class UserController extends Controller {
  constructor(){
    super();
    this.UserService = new UserService;
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
  async getAllUser(req, res){
    let result = await this.UserService.getAllUser(req.query.page);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = UserController;