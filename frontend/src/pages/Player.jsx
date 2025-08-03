// src/pages/Player.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../socket";

const Player = () => {
  const location = useLocation();
  const { roomCode, isHost } = location.state || {};
  const audioRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected as:", socket.id);
    });

    socket.on("play", () => {
      console.log("Received play signal");
      if (audioReady) audioRef.current?.play();
    });

    socket.on("pause", () => {
      console.log("Received pause signal");
      if (audioReady) audioRef.current?.pause();
    });

    socket.on("next", () => {
      console.log("Received next signal");
      // TODO: Implement next logic
    });

    return () => {
      socket.disconnect();
    };
  }, [audioReady]);

  const handlePlay = () => {
    socket.emit("play", roomCode);
    audioRef.current?.play();
  };

  const handlePause = () => {
    socket.emit("pause", roomCode);
    audioRef.current?.pause();
  };

  const handleNext = () => {
    socket.emit("next", roomCode);
    // TODO: Implement next logic
  };

  const handleInitialize = () => {
    audioRef.current?.pause();
    setAudioReady(true);
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-2">Room: {roomCode}</h2>
      <p className="text-gray-600 mb-4">
        You are {isHost ? "Hosting" : "Listening"} this room.
      </p>

      <audio ref={audioRef} controls className="mx-auto mb-4">
        <source src="/song1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!audioReady && !isHost && (
        <button
          className="bg-purple-500 text-white px-3 py-1 mb-4 rounded"
          onClick={handleInitialize}
        >
          Tap to Enable Audio 🔓
        </button>
      )}

      <div className="flex gap-4 justify-center mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handlePlay}
        >
          Play
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Player;
