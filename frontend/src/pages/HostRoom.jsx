// src/pages/HostRoom.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const HostRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  const handleHost = () => {
    if (roomCode.trim()) {
      socket.emit("create-room", roomCode);
      navigate("/player", { state: { roomCode, isHost: true } });
    }
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Start Room</h2>
      <input
        type="text"
        placeholder="Enter Room Code"
        className="border p-2 rounded mb-4 w-64"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <br />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
        onClick={handleHost}
      >
        Create Room
      </button>
    </div>
  );
};

export default HostRoom;
