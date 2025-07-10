import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function Home() {
  // State to hold the list of videos
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error loading videos:", err));
  }, []);

  return (
    <div>
      <FilterBar />
      <div className="flex flex-wrap justify-start gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
