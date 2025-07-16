import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function VideoPlayer({ width }) {
  const { id } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [category, setCategory] = useState("All");
  const [showMore, setShowMore] = useState(false);


  //  Fetches
  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then((res) => res.json())
      .then(setVideo)
      .catch((err) => console.error("Error loading video:", err));

    let endpoint = `http://localhost:5000/api/videos?exclude=${id}&limit=15`;
    if (category !== "All") {
      endpoint += `&category=${category}`;
    }
    fetch(endpoint)
      .then((res) => res.json())
      .then(setRecommended);

    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Error loading comments:", err));
  }, [id, category]);

  //  Safe handling even if user is null
  const handleAddComment = async (content) => {
    if (!user?.token) return;

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ videoId: id, content }),
    });

    const data = await res.json();
    setComments([data, ...comments]);
  };

  const handleEditComment = async (commentId, updatedContent) => {
    if (!user?.token) return;

    const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ content: updatedContent }),
    });

    const data = await res.json();
    setComments((prev) => prev.map((c) => (c._id === commentId ? data : c)));
    setEditingComment(null);
  };

  const handleDeleteComment = async (commentId) => {
    if (!user?.token) return;
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    await fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  const handleLike = async () => {

    //  Check if user is logged in

    if (!user?.token || !video?._id) {
      const goToLogin = window.confirm(
        "You need to be logged in to like videos. Go to login?"
      );
      if (goToLogin) {
        window.location.href = "/login";
      }
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/videos/${video._id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();
    setVideo((prev) => ({
      ...prev,
      likes: Array(data.likes).fill("x"),
      dislikes: Array(data.dislikes).fill("x"),
    }));
  };

  const handleDislike = async () => {

    //  Check if user is logged in

    if (!user?.token || !video?._id) {
      const goToLogin = window.confirm(
        "You need to be logged in to dislike videos. Go to login?"
      );
      if (goToLogin) {
        window.location.href = "/login";
      }
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/videos/${video._id}/dislike`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();
    setVideo((prev) => ({
      ...prev,
      likes: Array(data.likes).fill("x"),
      dislikes: Array(data.dislikes).fill("x"),
    }));
  };

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* LEFT: Video + Comments */}
      <div className={`w-full ${width ? "md:w-[70%]" : "md:w-[60%]"}`}>
        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-xl mb-4">
          <video
            key={video.videoUrl}
            controls
            className="w-full h-full object-cover rounded-xl"
            src={
              video.videoUrl.startsWith("http")
                ? video.videoUrl
                : `http://localhost:5000${video.videoUrl}`
            }
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{video.title}</h2>

        {/* Info + Buttons */}
        <div className="flex text-sm text-gray-600 mb-2">
          {/* Uploader and Views */}
          <div className="flex flex-col mr-4 gap-1">
            <span className="text-gray-800 font-medium">{video.uploader}</span>
            <span>{video.views} views</span>
          </div>

          <button className="bg-red-600 text-white px-3 rounded-full ml-2 mr-auto cursor-pointer hover:bg-red-700 transition duration-200">
            Subscribe
          </button>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap mt-2 sm:mt-0">
            <button
              onClick={handleLike}
              className={`hover:text-blue-600 cursor-pointer bg-red-100 px-3 rounded-full transition duration-200 ${
                user?.id && video.likes.includes(user.id)
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              👍 {video.likes?.length || 0}
            </button>
            <button
              onClick={handleDislike}
              className={`hover:text-red-600 cursor-pointer bg-red-100 px-3 rounded-full transition duration-200 ${
                user?.id && video.dislikes.includes(user.id)
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              👎 {video.dislikes?.length || 0}
            </button>
            <button className="cursor-pointer bg-red-100 px-3 rounded-full hover:text-gray-800">
              📤 Share
            </button>
            <button className="cursor-pointer bg-red-100 px-3 rounded-full hover:text-gray-800">
              ⬇ Download
            </button>
          </div>
        </div>

        {/* Collapsible Description */}
        <div className="text-sm bg-gray-200 p-2 rounded-xl text-gray-800 my-4">
          <p className={showMore ? "" : "line-clamp-2"}>{video.description}</p>
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-blue-600 hover:underline mt-1 text-sm"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>

        {/* Comments */}
        <div>
          <h4 className="font-semibold mb-2">Comments</h4>

          {/* Only show form if user is logged in */}
          {user && <CommentForm onSubmit={handleAddComment} />}

          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id}>
                {editingComment?._id === comment._id ? (
                  <CommentForm
                    initialContent={comment.content}
                    onSubmit={(updated) =>
                      handleEditComment(comment._id, updated)
                    }
                    onCancel={() => setEditingComment(null)}
                  />
                ) : (
                  <Comment
                    comment={comment}
                    isOwner={user?.id === comment.authorId}
                    onEdit={() => setEditingComment(comment)}
                    onDelete={() => handleDeleteComment(comment._id)}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT: Filters + Recommendations */}
      <div className="w-full mr-auto md:w-[20%] space-y-4">
        <FilterBar activeCategory={category} onChange={setCategory} />
        <div className="space-y-3">
          {recommended.map((v) => (
            <VideoCard key={v._id} video={v} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
