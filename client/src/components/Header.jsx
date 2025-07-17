import { useAuth } from "../context/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ toggleSidebar, onSearchChange }) {
  const { user, logout } = useAuth();
  const [channelId, setChannelId] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //  Submit search when Enter or 🔍 is pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(query.trim());
  };

  //  Clear input and reset search
  const handleClear = () => {
    setQuery("");
    onSearchChange("");
  };

  const location = useLocation(); // to detect route changes

  useEffect(() => {
    const fetchMyChannel = async () => {
      if (!user) {
        setChannelId(null);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/channels/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 404) {
          setChannelId(null);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setChannelId(data._id);
        } else {
          console.warn("Failed to fetch channel info.");
          setChannelId(null);
        }
      } catch (err) {
        console.error("Channel fetch error:", err.message);
        setChannelId(null);
      }
    };

    fetchMyChannel();

  }, [user, location.pathname]);

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
        <Link to="/" className="flex items-center">
          <img src="/logo.webp" alt="YouTube Clone Logo" className="h-8" />
          <span className="text-red-600 text-lg font-semibold hidden lg:block">
            YouTube
          </span>
          <span className="text-black font-light hidden lg:block">Clone</span>
        </Link>
      </div>

      {/*  Center - Search bar with clear icon */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full max-w-xl mx-8"
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-1.5 border border-gray-300 rounded-l-full focus:outline-none"
        />

        {/* Clear (X) icon */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 px-2 py-1.5 text-lg text-gray-400 hover:text-black cursor-pointer"
          >
            ✖
          </button>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-gray-100 px-2 py-1.5 rounded-r-full border-t border-b border-r border-gray-300 hover:bg-gray-200 cursor-pointer"
        >
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
