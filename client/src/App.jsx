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

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header (fixed height) */}
      <Header
        toggleSidebar={() => setShowSidebar(!showSidebar)}
        onSearchChange={setSearchText}
      />

      {/* Content below header */}
      <div className="flex pt-16 h-full">
        {/* Sidebar (absolute under header) */}
        {showSidebar && (
          <div className="absolute top-16 left-0 z-10 w-64 h-[calc(100%-4rem)] bg-white shadow-md border-r transition-all duration-300">
            <Sidebar />
          </div>
        )}

        {/* Main Content (with left margin if sidebar visible) */}
        <main
          className={`flex-1 transition-all duration-200 ${
            showSidebar ? "ml-64" : "ml-0"
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
