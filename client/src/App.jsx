import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadVideo from "./components/UploadVideo";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header (fixed height) */}
      <Header
        toggleSidebar={() => {
          setShowSidebar(!showSidebar);
          setIsCollapsed(!isCollapsed);
        }}
        onSearchChange={setSearchText}
      />

      {/* Content below header */}
      <div className="flex pt-16 h-full">
        {/* Sidebar (absolute under header) */}
        <div
          className={`fixed top-16 left-0 z-10 transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-60"
          }`}
        >
          <Sidebar collapsed={isCollapsed} />
        </div>

        {/* Main Content (with left margin if sidebar visible) */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-60"
          }`}
        >
          <div className="px-4 overflow-y-auto h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Home searchText={searchText} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/upload" element={<UploadVideo />} />
              <Route
                path="/channel/:id"
                element={
                  <ProtectedRoute>
                    <Channel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
