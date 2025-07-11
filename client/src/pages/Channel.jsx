import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import EditVideoForm from "../components/EditVideoForm";

function Channel() {
  const { user } = useAuth();
  const { id } = useParams(); // Channel ID from URL
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/channels/${id}`);
        if (res.ok) {
          const data = await res.json();
          setChannel(data);
        }
      } catch (err) {
        console.error("Channel load error:", err.message);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/videos?channel=${id}`
        );
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error("Video load error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
    fetchVideos();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  const handleDelete = async (videoId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setVideos(videos.filter((v) => v._id !== videoId));
      } else {
        alert("Failed to delete video");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleEditSave = async (videoId, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const updatedVideo = await res.json();
        setVideos((prev) =>
          prev.map((v) => (v._id === videoId ? updatedVideo : v))
        );
        setEditingVideo(null); // close form
      } else {
        alert("Update failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!channel)
    return <div className="p-4 text-red-600">Channel not found</div>;

  const isOwner = user && channel && user.id === channel.owner;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{channel.channelName}</h2>
      <p className="text-gray-600 mb-2">{channel.description}</p>
      <p className="text-sm text-gray-400 mb-6">
        Subscribers: {channel.subscribers}
      </p>

      <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
      <div className="flex flex-wrap gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="relative group">
              <VideoCard video={video} />
              {isOwner && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <button
                    onClick={() => setEditingVideo(video)}
                    className="bg-yellow-400 text-xs px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-500 text-xs px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No videos uploaded yet.</p>
        )}
      </div>
      {editingVideo && (
        <EditVideoForm
          video={editingVideo}
          onSave={handleEditSave}
          onCancel={() => setEditingVideo(null)}
        />
      )}
    </div>
  );
}

export default Channel;
