import { Link } from "react-router-dom";

function VideoCard({ video, compact = false }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className={`w-full flex ${
        compact ? "flex-row gap-3" : "flex-col"
      } sm:w-64 md:w-72 lg:w-80 p-2 block`}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className={`${
          compact ? "w-40 h-24" : "w-full h-48"
        } object-cover rounded-md`}
      />
      <div className={`${compact ? "flex-1" : ""}`}>
        <h4 className="text-sm font-semibold line-clamp-2">{video.title}</h4>
        <p className="text-xs text-gray-500">{video.uploader}</p>
        <p className="text-xs text-gray-400">{video.views} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;
