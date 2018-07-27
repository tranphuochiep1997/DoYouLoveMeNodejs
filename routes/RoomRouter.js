const express = require('express');
const roomRouter = express.Router();
let RoomController = require("../app/controllers/RoomController");
roomController = new RoomController();

roomRouter
  .get("/", (req, res)=>{
    let users = req.query.users.split(",");
    req.query.relatingUserId = users[0];
    req.query.relatedUserId = users[1];
    if (!users[0] || !users[1]){
      return res.json({
        error: 1,
        status: 404,
        data: null,
        message: "not_exact_query"
      });
    }
    roomController.getRoomByPairOfUserId(req, res);
  })
  

module.exports = roomRouter;