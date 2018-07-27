const express = require('express');
const friendRouter = express.Router();
let FriendController = require("../app/controllers/FriendController");
friendController = new FriendController();

friendRouter
  .post("/", (req, res)=>{
    friendController.postFriend(req, res);
  })
  .put("/:id", (req, res)=>{
    friendController.putFriend(req, res);
  })
  .get("/:id", (req, res)=>{
    friendController.getFriendById(req, res);
  })
  

module.exports = friendRouter;