const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {PORT_CONFIG, MONGODB_URL} = require('./config');
const PORT = process.env.PORT || PORT_CONFIG;
const trimParam = require('./app/middlewares/TrimParameter');
const cors = require('cors');
const app = express();
require('./app/helpers/errorCode');

//config server chat
const server = require('http').createServer(app);
const io = require('socket.io').listen(server, {
  path: "/api/chat",
  serveClient: false
});


server.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});

// -- Import repository
const RoomRepository = require("./app/repositories/RoomRepository");
const MessageRepository = require("./app/repositories/MessageRepository");
const roomRepository = new RoomRepository();
const messageRepository = new MessageRepository();

// -- Import router
const userRouter = require("./routes/UserRouter");
const friendRouter = require('./routes/FriendRouter');
const messageRouter = require("./routes/MessageRouter");
const roomRouter = require("./routes/RoomRouter");

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

// error handler
app.use(function(err, req, res, next) {
  return res.json(err);
});

// Socket
io.use((socket, next) => {
  if (socket.handshake.query.userId) return next();
  next(new Error('undefined_userId_error'));
});

io.on("connection", async (socket)=>{

  const userId = socket.handshake.query.userId;

  socket.on("JOIN_ROOM", (roomId)=>{
    socket.join(roomId);
  });

  socket.on("SEND_MESSAGE", ({message, roomId}) =>{
    messageRepository.add({roomId, body: message, sender: userId});
    socket.broadcast.to(roomId).emit("RECEIVE_MESSAGE", message);
  });

  socket.on("disconnect", ()=>{
    // console.log("User disconnected");
  })
});




