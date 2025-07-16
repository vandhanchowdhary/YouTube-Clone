import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({ collapsed }) {
  const [activeGroup, setActiveGroup] = useState(null);

  const toggleGroup = (group) => {
    setActiveGroup((prev) => (prev === group ? null : group));
  };

  const groups = [
    {
      name: "Primary",
      alwaysVisible: true,
      items: [
        { label: "Home", icon: "🏠", route: "/" },
        { label: "Shorts", icon: "🎬" },
        { label: "Subscriptions", icon: "📺" },
      ],
    },
    {
      name: "Explore",
      items: [
        { label: "Trending", icon: "🔥" },
        { label: "Music", icon: "🎵" },
        { label: "Gaming", icon: "🎮" },
        { label: "News", icon: "📰" },
        { label: "Sports", icon: "🏆" },
        { label: "Learning", icon: "📘" },
      ],
    },
    {
      name: "Library",
      items: [
        { label: "History", icon: "🕒" },
        { label: "Your Videos", icon: "🎥" },
        { label: "Watch Later", icon: "⏱️" },
        { label: "Liked Videos", icon: "👍" },
        { label: "Downloads", icon: "⬇️" },
      ],
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-60"
      } h-[calc(100vh-4rem)] bg-white text-sm text-gray-800 transition-all duration-200 overflow-y-auto`}
    >
      <ul className="space-y-2 p-2">
        {groups.map((group, i) => {
          const isExpanded = activeGroup === group.name;

          const visibleItems = collapsed
            ? group.items
            : group.alwaysVisible
            ? group.items
            : isExpanded
            ? group.items
            : group.items.slice(0, 4);

          return (
            <li key={i}>
              {!group.alwaysVisible && !collapsed && (
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex justify-between items-center text-xs text-black bg-gray-200 py-1 rounded-md uppercase font-semibold tracking-wide mb-1 px-3"
                >
                  <span>{group.name}</span>
                  <span
                    className={`transform transition-transform duration-300 text-2xl ${
                      isExpanded ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    🔻
                  </span>
                </button>
              )}

              <ul className="space-y-1">
                {visibleItems.map((item, idx) => {
                  const content = (
                    <div
                      className={`${
                        collapsed
                          ? "flex flex-col items-center text-xs"
                          : "flex items-center gap-4"
                      } px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition cursor-pointer`}
                      title={collapsed ? item.label : ""}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                  );

                  return (
                    <li key={idx}>
                      {item.route ? (
                        <Link to={item.route}>{content}</Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
