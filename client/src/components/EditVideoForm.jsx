import { useState } from "react";

function EditVideoForm({ video, onSave, onCancel }) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(video._id, { title, description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow w-[90%] max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Edit Video</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVideoForm;