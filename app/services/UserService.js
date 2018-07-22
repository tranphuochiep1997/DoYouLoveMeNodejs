const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor(){
    this.UserRepository = new UserRepository();
  }
  async createNewUser(body){
    try {
      let {facebookId} = body;
      // Check existed User
      const existedUser = await this.UserRepository.getByFacebookId(facebookId);
      if (existedUser) {
        return errorCode.user_existed;
      }
      const createdUser = await this.UserRepository.add(body);
      if (!createdUser) {
        return errorCode.unexpected_error;
      }
      return {
        error: errorCode.success.error, 
        message: errorCode.success.message,
        data: createdUser
      } ;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
  async updateUserByFacebookId(id, body){
    try {
      let updatedUser = await this.UserRepository.updateByFacebookId(id, body);
      if (updatedUser){
        let success = {
          error: errorCode.success.error,
          message: errorCode.success.message,
          data: updatedUser
        };
        return success;
      }
      return errorCode.user_not_exist;
    }catch(err){
      console.log(err);
      return errorCode.unexpected_error;
    }
  }
  async getUserByFacebookId(id){
    const user = await this.UserRepository.getByFacebookId(id);
    if (!user){
      return errorCode.user_not_exist;
    }
    let success = {
      error: errorCode.success.error,
      message: errorCode.success.message,
      data: user
    }
    return success;
  }
  async getAllUser(page){
    const users = await this.UserRepository.getAll(page);
    let success = {
      error: errorCode.success.error,
      message: errorCode.success.message,
      data: users
    }
    return success;
  }
}

module.exports = UserService;