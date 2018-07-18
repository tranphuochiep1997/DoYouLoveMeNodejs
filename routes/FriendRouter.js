const express = require('express');
const friendRouter = express.Router();
let FriendController = require("../app/controllers/FriendController");
friendController = new FriendController();

friendRouter
  .post("/", (req, res)=>{
    friendController.postFriend(req, res);
  })

module.exports = friendRouter;