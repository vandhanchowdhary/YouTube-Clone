import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function Home() {
  const videos = [
    {
      videoId: "video01",
      title: "Learn React in 30 Minutes",
      thumbnailUrl:
        "https://i.ytimg.com/vi/dCLhUialKPQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCevfmBR-fsqbH30i12qnyf-0IQkQ",
      uploader: "Code with John",
      views: 15200,
    },
    {
      videoId: "video02",
      title: "Express.js Crash Course",
      thumbnailUrl:
        "https://i.ytimg.com/vi/SccSCuHhOw0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBJpb4OfKxVHdNIcahI28G9rdYd_g",
      uploader: "DevSimplified",
      views: 9800,
    },
  ];

  return (
    <div>
      <FilterBar />
      <div className="flex flex-wrap justify-start gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
