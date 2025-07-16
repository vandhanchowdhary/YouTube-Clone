import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function Home({ searchText }) {
  const [videos, setVideos] = useState([]); // State to hold the list of videos
  const [category, setCategory] = useState("All"); // State to hold the selected category

  // Fetch videos based on search text or category or both.
  useEffect(() => {
    const queryParams = [];

    if (searchText.trim()) queryParams.push(`search=${searchText}`);
    if (category !== "All") queryParams.push(`category=${category}`);

    const endpoint =
      "http://localhost:5000/api/videos" +
      (queryParams.length ? "?" + queryParams.join("&") : "");

    fetch(endpoint)
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error("Error loading videos:", err));
  }, [searchText, category]);


  return (
    <div>
      <FilterBar activeCategory={category} onChange={setCategory} />
      <h2>{searchText ? `Showing results for "${searchText}"` : null}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
