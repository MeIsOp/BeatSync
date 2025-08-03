import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import Home from "./pages/Home.jsx";
import HostRoom from "./pages/HostRoom.jsx";
import JoinRoom from "./pages/JoinRoom.jsx";
import Player from "./pages/Player.jsx";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="host" element={<HostRoom />} />
          <Route path="join" element={<JoinRoom />} />
          <Route path="player" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
