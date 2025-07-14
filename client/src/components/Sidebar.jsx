import { Link } from "react-router-dom";

function Sidebar({ collapsed }) {
  const items = [
    { label: "Home", icon: "🏠", route: "/" },
    { label: "Shorts", icon: "🎬" },
    { label: "Subscriptions", icon: "📺" },
    { label: "YouTube Music", icon: "🎵" },
    { label: "You", icon: "👤" },
    { label: "Downloads", icon: "⬇️" },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-15" : "w-50"
      } bg-white text-sm text-gray-800 border-r h-full pt-4 fixed top-16 left-0`}
    >
      <ul className="space-y-2">
        {items.map((item, index) => {
          const content = (
            <div
              className={`${
                collapsed
                  ? "flex flex-col items-center text-xs"
                  : "flex items-center gap-4"
              } px-3 py-2 hover:bg-gray-100 rounded-lg transition cursor-pointer`}
              title={collapsed ? item.label : ""}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          );

          return (
            <li key={index}>
              {item.route ? <Link to={item.route}>{content}</Link> : content}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
