const UserRepository = require('../repositories/UserRepository');
const checkObjectId = require("../helpers/CheckObjectId");

class UserService {
  constructor(){
    this.UserRepository = new UserRepository();
  }
  async updateUserById(req){
    try {
      const id = req.params.id;
      const userId = req.userId;
      if (id !== userId){
        return errorCode.invalid_token;
      }
      if (!checkObjectId(id)){
        return errorCode.user_not_exist;
      }
      let updatedUser = await this.UserRepository.updateUserById(id, req.body);
      if (updatedUser){
        let success = {
          error: errorCode.success.error,
          message: errorCode.success.message,
          data: {
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            about: updatedUser.about,
            status: updatedUser.status,
            birthday: updatedUser.birthday,
            gender: updatedUser.gender,
            picture: updatedUser.picture
          }
        };
        return success;
      }
      return errorCode.user_not_exist;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
  async getUserById(req){
    try {
      if (!checkObjectId(req.params.id)){
        return errorCode.user_not_exist;
      }
      let user = await this.UserRepository.getUserById(req.params.id);
      if (user){
        let success = {
          error: errorCode.success.error,
          message: errorCode.success.message,
          data: {
            _id: user._id,
            email: user.email,
            name: user.name,
            about: user.about,
            status: user.status,
            birthday: user.birthday,
            gender: user.gender,
            picture: user.picture
          }
        };
        return success;
      }
      return errorCode.user_not_exist;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
  async getAllUser(req){
    try {
      const users = await this.UserRepository.getAll({page: req.query.page, search: req.query.search});
      let success = {
        error: errorCode.success.error,
        message: errorCode.success.message,
        data: users
      }
      return success;
    } catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
    
  }
}
module.exports = UserService;