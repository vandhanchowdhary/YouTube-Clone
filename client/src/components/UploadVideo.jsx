import { useState } from "react";
import { useAuth } from "../context/useAuth";

function UploadVideo() {
  const { user } = useAuth();
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "React",
    file: null,
  });

  const categories = [
    "React",
    "Node",
    "MongoDB",
    "CSS",
    "JavaScript",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("video", formData.file);
    form.append("channelId", user.channelId); // Assuming user has this, then it auto attaches to the video and hidden from the user

    try {
      const res = await fetch("http://localhost:5000/api/videos/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: form,
      });

      if (res.ok) {
        setStatus("✅ Upload successful!");
        setFormData({
          title: "",
          description: "",
          category: "React",
          file: null,
        });
      } else {
        const err = await res.json();
        setStatus(`❌ Upload failed: ${err.message}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        ></textarea>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="file"
          accept="video/*"
          onChange={handleChange}
          required
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}

export default UploadVideo;