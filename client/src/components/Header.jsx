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
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-800 text-white flex items-center justify-between h-16 px-4 shadow">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl px-2.5 py-1 rounded-full cursor-pointer hover:bg-gray-700 transition-all duration-200">
          ☰
        </button>
        <Link to="/" className="text-lg font-bold">
          YouTube Clone
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-1 justify-center"
      >
        <input
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={handleChange}
          className="px-3 py-1 rounded-l border"
        />
        <button className="bg-gray-200 px-4 rounded-r">🔍</button>
      </form>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            {channelId ? (
              <button
                onClick={() => navigate(`/channel/${channelId}`)}
                className="bg-green-600 text-sm px-3 py-1 rounded"
              >
                View Channel
              </button>
            ) : (
              <button
                onClick={() => navigate("/channel")}
                className="bg-yellow-500 text-sm px-3 py-1 rounded"
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
              className="bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 px-4 py-1 rounded">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;