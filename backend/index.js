// Yeh aapka full working backend code hoga:

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-room", (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room: ${roomCode}`);
  });

  socket.on("play", (roomCode) => {
    console.log("Play triggered in room", roomCode);
    socket.to(roomCode).emit("play");
  });

  socket.on("pause", (roomCode) => {
    socket.to(roomCode).emit("pause");
  });

  socket.on("next", (roomCode) => {
    socket.to(roomCode).emit("next");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
