const express = require('express');
const authRouter = express.Router();
const AuthController = require('../app/Controllers/AuthController');
const authController = new AuthController();
const userValidator = require("../app/validation/Validator/UserValidator");

authRouter
  .post('/login', userValidator, (req, res)=>{
    authController.login(req, res);
  })
  .post('/register', userValidator, (req, res)=>{
      authController.register(req, res);
  });

module.exports = authRouter;