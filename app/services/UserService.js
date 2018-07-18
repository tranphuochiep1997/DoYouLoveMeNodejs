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
      if (!existedUser){
        const createdUser = await this.UserRepository.add(body);
        if (createdUser){
          return errorCode.success;
        }
        return errorCode.unexpected_error;
      }
      return errorCode.user_existed;
    }catch(err){
      return errorCode.unexpected_error;
    }
  }
  async updateUserByFacebookId(id, body){
    try {
      let updatedUser = await this.UserRepository.updateByFacebookId(id, body);
      if (updatedUser){
        errorCode.success.data = updatedUser;
        return errorCode.success;
      }
      return errorCode.user_not_exist;
    }catch(err){
      return errorCode.unexpected_error;
    }
  }
  async getUserByFacebookId(id){
    const user = await this.UserRepository.getByFacebookId(id);
    if (!user){
      return errorCode.user_not_exist;
    }
    errorCode.success.data = user;
    return errorCode.success;
  }
  async getAllUser(page){
    const users = await this.UserRepository.getAll(page);
    errorCode.success.data = users;
    return errorCode.success;
  }
}

module.exports = UserService;