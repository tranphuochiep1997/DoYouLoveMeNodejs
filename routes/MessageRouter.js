const express = require('express');
const messageRouter = express.Router();
const authValidator = require("../app/validation/Validator/AuthValidator");
const Authentication = require("../app/middlewares/Authentication");
let MessageController = require("../app/controllers/MessageController");
messageController = new MessageController();

messageRouter
  .get("/", authValidator, Authentication.authenticate, (req, res)=>{
    messageController.getAllMessagesByRoomId(req, res);
  })

module.exports = messageRouter;