import { useParams } from "react-router-dom";

function VideoPlayer() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Playing Video: {id}</h2>

      {/* Placeholder video */}
      <div className="w-[50%] aspect-video bg-black rounded mb-4">
        <p className="text-white p-4">Video Player for {id}</p>
      </div>

      {/* Placeholder video info */}
      <div>
        <h3 className="text-lg font-semibold">Sample Video Title</h3>
        <p className="text-sm text-gray-500">Channel Name • 15,000 views</p>
      </div>
    </div>
  );
}

export default VideoPlayer;