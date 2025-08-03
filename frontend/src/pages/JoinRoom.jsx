// src/pages/JoinRoom.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on("error", (errMsg) => {
      setError(errMsg);
    });

    return () => {
      socket.off("error");
      socket.disconnect();
    };
  }, []);

  const handleJoin = () => {
    if (roomCode.trim()) {
      socket.emit("join-room", roomCode);
      navigate("/player", { state: { roomCode, isHost: false } });
    }
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Join an existing room</h2>
      <input
        type="text"
        placeholder="Enter Room Code"
        className="border p-2 rounded mb-4 w-64"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <br />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2"
        onClick={handleJoin}
      >
        Join Room
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JoinRoom;
