const express = require('express');
const messageRouter = express.Router();
let MessageController = require("../app/controllers/MessageController");
messageController = new MessageController();

messageRouter
  .get("/", (req, res)=>{
    messageController.getAllMessagesByRoomId(req, res);
  })

module.exports = messageRouter;