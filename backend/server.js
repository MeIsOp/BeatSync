// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow from anywhere (frontend port e.g. 5173)
    methods: ["GET", "POST"]
  }
});

const rooms = new Map(); // Store active rooms and their members

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("create-room", (roomCode) => {
    console.log("Room created:", roomCode);
    socket.join(roomCode);
    rooms.set(roomCode, [socket.id]);
  });

  socket.on("join-room", (roomCode, callback) => {
    console.log("Join attempt:", roomCode);

    if (rooms.has(roomCode)) {
      socket.join(roomCode);
      rooms.get(roomCode).push(socket.id);
      console.log("Room joined:", roomCode);
      callback({ success: true });
    } else {
      console.log("❌ Room not found:", roomCode);
      callback({ success: false });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    // Optional: Remove from rooms if needed
  });
});

module.exports = server;
