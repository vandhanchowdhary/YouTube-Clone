const categories = [
  "All",
  "React",
  "Node",
  "MongoDB",
  "JavaScript",
  "CSS",
  "Tailwind",
];

function FilterBar({ activeCategory, onChange }) {
  return (
    <div className="flex gap-3 scrollbar-hide overflow-x-auto py-3 px-4 bg-white border-b sticky z-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap cursor-pointer transition-all duration-200
            ${
              activeCategory === cat
                ? "bg-black text-white hover:text-red-500"
                : "bg-gray-200 text-gray-700 hover:text-black"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
