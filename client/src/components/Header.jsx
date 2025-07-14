import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ toggleSidebar, onSearchChange }) {
  const { user, logout } = useAuth();
  const [channelId, setChannelId] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value); // lifts search input to parent and sends up to app
  };

  useEffect(() => {
    const fetchMyChannel = async () => {
      if (!user) {
        setChannelId(null); // Reset if no user
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/channels/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setChannelId(data._id);
        } else {
          setChannelId(null); // No channel found for user
        }
      } catch (err) {
        console.error("Channel fetch error:", err.message);
        setChannelId(null); // Reset on fetch failure
      }
    };

    fetchMyChannel();
  }, [user]); // re-run on login/logout

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white text-black flex items-center justify-between h-16 px-4 border-b shadow-sm">
      {/* Left - Sidebar toggle & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-xl px-2 py-1 rounded-full hover:bg-gray-100 transition"
        >
          ☰
        </button>
        <Link to="/" className="text-lg font-semibold text-red-600">
          YouTube <span className="text-black font-light">Clone</span>
        </Link>
      </div>

      {/* Center - Search bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center w-full max-w-xl mx-8"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className="w-full px-4 py-1.5 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button className="bg-gray-100 px-4 py-1.5 rounded-r-full border-t border-b border-r border-gray-300">
          🔍
        </button>
      </form>

      {/* Right - Channel/Login */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            {channelId ? (
              <button
                onClick={() => navigate(`/channel/${channelId}`)}
                className="bg-green-600 text-white text-sm px-3 py-1 rounded-md hover:bg-green-700 transition"
              >
                View Channel
              </button>
            ) : (
              <button
                onClick={() => navigate("/channel")}
                className="bg-yellow-500 text-black text-sm px-3 py-1 rounded-md hover:bg-yellow-600 transition"
              >
                Create Channel
              </button>
            )}
          </>
        )}
        {user ? (
          <>
            <span className="text-sm">👤 {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 text-sm rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;