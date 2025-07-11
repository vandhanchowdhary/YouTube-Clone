import { useState } from "react";

function ChannelCreateForm({ onSubmit }) {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ channelName, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow"
    >
      <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>
      <input
        type="text"
        placeholder="Channel Name"
        required
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Create Channel
      </button>
    </form>
  );
}

export default ChannelCreateForm;