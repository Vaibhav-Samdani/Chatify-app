const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")
require("dotenv").config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB started!");
  })
  .catch((err) => {
    console.log("Mongo Error : ", err);
  });


app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});

const io = socket(server,{
  cors: {
    origin: "http://localhost:5173",
    credentials : true,
  },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
  });

  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.msg)
    }
  })
})