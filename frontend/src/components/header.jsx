import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎵 Beatflow</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/host" className="hover:text-gray-300">Start Room</Link>
        <Link to="/join" className="hover:text-gray-300">Join Room</Link>
      </nav>
    </header>
  );
};

export default Header;
