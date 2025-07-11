import { useState } from "react";

function CommentForm({ onSubmit, initialContent = "", onCancel }) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded resize-none text-sm"
        rows={2}
        placeholder="Add a comment..."
      />
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Post
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CommentForm;
