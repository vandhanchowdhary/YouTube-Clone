function VideoCard({ video }) {
  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 p-2">
      <img src={video.thumbnailUrl} alt={video.title} className="rounded-md" />
      <h3 className="font-semibold mt-2 text-sm">{video.title}</h3>
      <p className="text-xs text-gray-500">{video.uploader}</p>
      <p className="text-xs text-gray-500">{video.views} views</p>
    </div>
  );
}

export default VideoCard;