import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => setVideo(data))
      .catch((err) => console.error("Error loading video:", err));
  }, [id]);

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="w-full aspect-video bg-black rounded mb-4">
        {/* Replace with real <video> later */}
        <p className="text-white p-4">Video player for {video.title}</p>
      </div>
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-sm text-gray-500">
        {video.uploader} • {video.views} views
      </p>
      <p className="mt-2 text-sm">{video.description}</p>
    </div>
  );
}

export default VideoPlayer;