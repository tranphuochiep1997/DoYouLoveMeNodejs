var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {PORT_CONFIG, MONGODB_URL} = require('./config');
const PORT = process.env.PORT || PORT_CONFIG;
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
require('./app/helpers/errorCode');

server.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}`);
});

// -- Import router
const userRouter = require("./routes/UserRouter");
const friendRouter = require('./routes/FriendRouter');

//Set up mongoose connection
mongoose.connect(MONGODB_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine


// Routers
app.use("/api/users", userRouter);
app.use("/api/friends", friendRouter);
app.use('/', (req, res)=>{
  const messages = ["hello", "hi", "how are you?",
   "I'm 19, and you?", "I'm 21", "How long have been in danang",
    "20 years",
    "I'm 19, and you?", "I'm 21", "How long have been in danang",];
  res.render('index', {messages: messages});
})
// Socket
io.on("connection", (socket)=>{

})

// error handler
app.use(function(err, req, res, next) {
  return res.json(err);
});




