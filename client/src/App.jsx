import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import Channel from "./pages/Channel.jsx";
import { useState } from "react";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />
        <div className="p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/channel/:id" element={<Channel />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;