import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <ul>
        <li className="mb-2 bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded-lg">
          <Link to="/">Home</Link>
        </li>
        <li className="mb-2 bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded-lg">
          <Link to="/trending">Trending</Link>
        </li>
        <li className="mb-2 bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded-lg">
          <Link to="/subscriptions">Subscriptions</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
