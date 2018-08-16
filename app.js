const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {PORT_CONFIG, MONGODB_URL, SECRET_KEY} = require('./config');
const PORT = process.env.PORT || PORT_CONFIG;
const trimParam = require('./app/middlewares/TrimParameter');
const cors = require('cors');
const app = express();
require('./app/helpers/errorCode');
const jwt = require("jsonwebtoken");

//config server chat
const server = require('http').createServer(app);
const io = require('socket.io').listen(server, {
  path: "/api/chat",
  serveClient: false
});


server.listen(process.env.PORT || PORT_CONFIG, function() {
  console.log(`Server is listening on port ${process.env.PORT || PORT_CONFIG}`);
});

// -- Import repository
const MessageRepository = require("./app/repositories/MessageRepository");
const messageRepository = new MessageRepository();

// -- Import router
const userRouter = require("./routes/UserRouter");
const friendRouter = require('./routes/FriendRouter');
const messageRouter = require("./routes/MessageRouter");
const roomRouter = require("./routes/RoomRouter");
const authRouter = require("./routes/AuthRouter");

//Set up mongoose connection
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(trimParam);


// Routers
app.use("/api/users", userRouter);
app.use("/api/friends", friendRouter);
app.use("/api/messages", messageRouter);
app.use("/api/rooms", roomRouter);
app.use("/api", authRouter);

// error handler
app.use(function(err, req, res, next) {
  return res.json(err);
});

// Socket
io.use((socket, next) => {
  const query = socket.handshake.query;
  if (query && query.token){
    jwt.verify(query.token, SECRET_KEY, (err, payload)=>{
      if (err){
        return next(new Error('Authentication error'));
      }
      socket.handshake.query.userId = payload._id;
      return next();
    })
  }
  next(new Error('Authentication error'));
});

io.on("connection", async (socket)=>{

  const userId = socket.handshake.query.userId;

  socket.on("JOIN_ROOM", (roomId)=>{
    socket.join(roomId);
  });

  socket.on("SEND_MESSAGE", ({message, roomId}) =>{
    messageRepository.add({roomId, body: message, sender: userId});
    socket.to(roomId).emit("RECEIVE_MESSAGE", message);
  });

  socket.on("disconnect", ()=>{
    // console.log("User disconnected");
  })
});




