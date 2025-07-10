import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();

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
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {user.username}</span>
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="bg-blue-600 px-4 py-1 rounded">
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;