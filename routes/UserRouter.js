const express = require('express');
const userRouter = express.Router();
let UserController = require("../app/controllers/UserController");
    UserController = new UserController();
userRouter
  .post('/', (req, res)=>{
    UserController.postUser(req, res);
  })
  // update user by facebook Id
  .put('/:id', (req, res)=>{
    UserController.putUserByFacebookId(req, res);
  })
  .get("/:id", (req, res)=>{
    UserController.getUserByFacebookId(req, res);
  })
  .get("/", (req, res)=>{
    UserController.getAllUser(req, res);
  })

module.exports = userRouter;