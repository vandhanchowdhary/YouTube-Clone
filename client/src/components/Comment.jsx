function Comment({ comment, isOwner, onEdit, onDelete }) {
  return (
    <div className="border-b py-2">
      <div className="flex justify-between">
        <span className="font-semibold">{comment.authorName}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-sm mt-1">{comment.content}</p>

      {isOwner && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onEdit(comment)}
            className="text-xs text-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(comment._id)}
            className="text-xs text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
