import { Link } from "react-router-dom";

function VideoCard({ video, compact = false, scaleUp }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className={`w-full flex ${
        compact ? "flex-row gap-3" : "flex-col h-56"
      } p-2 bg-gray-100 block rounded-lg shadow hover:scale-105 ${
        !compact && scaleUp ? "scale-105 hover:scale-110" : ""
      } transition-all duration-200`}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className={`${
          compact ? "w-40 h-24" : "w-full h-40"
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
