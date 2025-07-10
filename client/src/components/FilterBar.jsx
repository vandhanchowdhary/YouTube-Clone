const filters = ["All", "React", "Node.js", "MongoDB", "Frontend", "Backend"];

function FilterBar() {
  return (
    <div className="flex space-x-3 overflow-x-auto py-3 px-4 bg-white border-b sticky z-10">
      {filters.map((filter, idx) => (
        <button
          key={idx}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-full whitespace-nowrap"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;