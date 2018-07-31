const express = require('express');
const userRouter = express.Router();
const authValidator = require("../app/validation/Validator/AuthValidator");
const Authentication = require("../app/middlewares/Authentication");
const updateUserValidator = require("../app/validation/Validator/UpdateUserValidator");
let UserController = require("../app/controllers/UserController");
    UserController = new UserController();

userRouter
  .put('/:id', authValidator, updateUserValidator, Authentication.authenticate, (req, res)=>{
    UserController.putUserById(req, res);
  })
  .get("/:id", (req, res)=>{
    UserController.getUserById(req, res);
  })
  .get("/:id/friends",authValidator, Authentication.authenticate, (req, res)=>{
    UserController.getAllFriendsByUserId(req, res);
  })
  .get("/", (req, res)=>{
    UserController.getAllUser(req, res);
  })

module.exports = userRouter;