const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../../config");

class AuthService {
  constructor(){
    this.UserRepository = new UserRepository();
  }
  async login({email, password}){
    try {
      
      const user = await this.UserRepository.getUserByEmail(email);
      if (!user){
        return errorCode.email_or_password_not_matched;
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword){
        return errorCode.email_or_password_not_matched;
      }
      const payload = {
        _id: user._id
      }
      let expiresIn = "30 days";
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn});
      let response = errorCode.success;
      delete user.password;
      response.data = {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          status: user.status,
          birthday: user.birthday,
          gender: user.gender,
          picture:user.picture
        },
        token,
        expiresIn
      }
      return response;
  } catch(err){
    console.log(err);
    return errorCode.unexpected_error;
  }
  }
  async register({email, password}){
    try {
      const user = await this.UserRepository.getUserByEmail(email);
      if (user){
        return errorCode.user_existed;
      }
      const createdUser = await this.UserRepository.add({email, password});
      if (createdUser){
        return errorCode.success;
      }
      return errorCode.unexpected_error;
  } catch(err){
    console.log(err);
    return errorCode.unexpected_error;
  }
  }
}

module.exports = AuthService;