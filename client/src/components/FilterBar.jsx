import { useRef, useEffect, useState } from "react";

const categories = [
  "All",
  "React",
  "Node",
  "MongoDB",
  "JavaScript",
  "CSS",
  "Tailwind",
  "UI/UX",
  "HTML",
  "Express",
  "Redux",
  "Next.js",
  "TypeScript",
  "Docker",
  "Auth",
  "API",
];

function FilterBar({ activeCategory, onChange }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll Logic
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="flex justify-between items-center w-full rounded-xl shadow-md">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className=" bg-red-500 shadow rounded-l-full w-7 h-7 flex py-2 px-3 items-center justify-center hover:bg-gray-100"
        >
          <span className="text-white hover:text-red-500">◁</span>
        </button>
      )}

      {/* Scrollable Tags */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide mx-2 p-2 bg-white max-w-full "
      >
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

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className=" bg-red-500 shadow rounded-r-full w-7 h-7 py-2 px-3 flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-white hover:text-red-500">▷</span>
        </button>
      )}
    </div>
  );
}

export default FilterBar;
