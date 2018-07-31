const Controller = require("./Controller");
const AuthService = require("../services/AuthService");

class AuthController extends Controller {
  constructor(){
    super();
    this.AuthService = new AuthService;
  }
  async login (req, res) {
    
    let result = await this.AuthService.login(req.body);
    if (!result.error){
      return this.successResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
  async register (req, res) {
    let result = await this.AuthService.register(req.body);
    if (!result.error){
      return this.createdResponse(res, result);
    }
    return this.errorResponse(res, result);
  }
}

module.exports = AuthController;