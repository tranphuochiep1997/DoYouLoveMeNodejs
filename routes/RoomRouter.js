const express = require('express');
const roomRouter = express.Router();
let RoomController = require("../app/controllers/RoomController");
roomController = new RoomController();
const authValidator = require("../app/validation/Validator/AuthValidator");
const Authentication = require("../app/middlewares/Authentication");

roomRouter
  .get("/:relatedUserId", authValidator, Authentication.authenticate, (req, res)=>{
    roomController.getRoomByPairOfUserId(req, res);
  })
  

module.exports = roomRouter;