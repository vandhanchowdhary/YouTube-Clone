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
import CreateChannel from "./components/CreateChannel";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="relative h-screen overflow-x-hidden">
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
        {!isCollapsed && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-9"
            onClick={() => {
              setShowSidebar(false);
              setIsCollapsed(true);
            }}
          ></div>
        )}

        {/* Main Content (with left margin if sidebar visible) */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "md:ml-20" : "md:ml-60"
          } ${
            !isCollapsed ? "max-[767px]:ml-0" : "ml-20 p-4"
          } overflow-x-hidden`}
        >
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            <Routes>
              <Route
                path="/"
                element={<Home searchText={searchText} scaleUp={isCollapsed} />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/video/:id"
                element={<VideoPlayer width={isCollapsed} />}
              />
              <Route path="/upload" element={<UploadVideo />} />
              <Route
                path="/channel/:id"
                element={
                  <ProtectedRoute>
                    <Channel />
                  </ProtectedRoute>
                }
              />
              <Route path="/channel">
                <Route index element={<CreateChannel />} />
                <Route path=":id" element={<Channel />} />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
