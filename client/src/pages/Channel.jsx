import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useParams, Link } from "react-router-dom";
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

  const handleDeleteChannel = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/channels/${channel._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 409) {
        // Channel has videos — prompt for force deletion
        const data = await res.json();
        const confirmForce = window.confirm(
          `This channel has ${data.videosCount} video(s). Do you want to delete them along with the channel?`
        );

        if (!confirmForce) return;

        // Retry with force=true
        const forceRes = await fetch(
          `http://localhost:5000/api/channels/${channel._id}?force=true`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (forceRes.ok) {
          alert("Channel and its videos deleted successfully.");
          window.location.href = "/"; // redirect to home
        } else {
          alert("Failed to delete channel with videos.");
        }
      } else if (res.ok) {
        alert("Channel deleted.");
        window.location.href = "/";
      } else {
        alert("Failed to delete channel.");
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
    <div className="min-h-screen bg-white">
      {/* Channel Banner & Info */}
      <div className="w-full h-48 bg-gradient-to-r from-red-600 to-pink-500 relative">
        <div className="absolute bottom-4 left-6 text-white">
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>
          <p className="text-sm text-white/90">{channel.description}</p>
          <p className="text-xs mt-1 text-white/80">
            {channel.subscribers} subscribers
          </p>
        </div>
      </div>

      {/* Channel Actions (only owner) */}
      {isOwner && (
        <div className="flex justify-end gap-4 px-6 py-4 bg-gray-100 border-b">
          <Link
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
          >
            ⬆ Upload Video
          </Link>

          <button
            onClick={handleDeleteChannel}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
          >
            🗑 Delete Channel
          </button>
        </div>
      )}

      {/* Video Section */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
        {videos.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-md flex flex-col justify-between items-center"
              >
                <VideoCard video={video} />

                {isOwner && (
                  <div className="mt-2 flex justify-evenly gap-2">
                    <button
                      onClick={() => setEditingVideo(video)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-xs px-3 py-1 rounded"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="bg-red-500 hover:bg-red-600 text-xs px-3 py-1 rounded text-white"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No videos uploaded yet.</p>
        )}
      </div>

      {/* Edit Form Overlay */}
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
