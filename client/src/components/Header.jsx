import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [channelId, setChannelId] = useState(null);
  const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl">
          ☰
        </button>
        <Link to="/" className="text-lg font-bold">
          YouTube Clone
        </Link>
      </div>

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