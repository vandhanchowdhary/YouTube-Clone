import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function VideoPlayer() {
  const { id } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
      })
      .catch((err) => console.error("Error loading video:", err));

    let endpoint = `http://localhost:5000/api/videos?exclude=${id}&limit=6`;
    if (category !== "All") {
      endpoint += `&category=${category}`;
    }
    fetch(endpoint)
      .then((res) => res.json())
      .then(setRecommended);

    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => console.error("Error loading comments:", err));
  }, [id, category]);

  const handleAddComment = async (content) => {
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
    setEditingComment(null); // Close form
  };

  const handleDeleteComment = async (commentId) => {
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

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* LEFT: Video + Comments */}
      <div className="w-full md:w-[70%]">
        <div className="aspect-video w-full bg-black rounded-xl mb-4">
          <video controls className="w-full h-full object-cover rounded-xl">
            <source
              src={`http://localhost:5000${video.videoUrl}`}
              alt={video.thumbnailUrl}
              type="video/mp4"
            />
          </video>
        </div>

        <h3 className="text-lg font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-500">
          {video.uploader} • {video.views} views
        </p>
        <p className="mt-2 text-sm">{video.description}</p>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Comments</h4>
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
      <div className="w-full md:w-[30%] space-y-4">
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
