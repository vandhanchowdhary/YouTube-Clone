import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className="w-full sm:w-64 md:w-72 lg:w-80 p-2 block"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="rounded-md w-full h-40 object-cover"
      />
      <h3 className="font-semibold mt-2 text-sm">{video.title}</h3>
      <p className="text-xs text-gray-500">{video.uploader}</p>
      <p className="text-xs text-gray-500">{video.views} views</p>
    </Link>
  );
}

export default VideoCard;