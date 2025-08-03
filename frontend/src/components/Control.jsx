import { useNavigate } from "react-router-dom";

const Controls = ({ socket }) => {
  const navigate = useNavigate();

  const roomCode = "ABCD1234"; // Dummy for now

  const handleHost = () => {
    socket?.emit("create-room", roomCode);
    navigate("/player", { state: { roomCode, isHost: true } });
  };

  const handleJoin = () => {
    socket?.emit("join-room", roomCode);
    navigate("/player", { state: { roomCode, isHost: false } });
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={handleHost}
      >
        Host Room
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
        onClick={handleJoin}
      >
        Join Room
      </button>
    </div>
  );
};

export default Controls;
