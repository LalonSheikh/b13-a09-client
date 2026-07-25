"use client";

import { useEffect, useState } from "react";

export default function Comments({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000";

  const loadComments = async () => {
    try {
      const res = await fetch(`${API}/ideas/${ideaId}/comments`);
      const data = await res.json();
      setComments(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ideaId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      if (editingId) {
        await fetch(`${API}/ideas/${ideaId}/comments/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
          }),
        });
      } else {
        await fetch(`${API}/ideas/${ideaId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: "AJ",
            photoURL: "",
            text,
          }),
        });
      }

      setText("");
      setEditingId(null);
      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setText(comment.text);
  };

  const handleCancel = () => {
    setEditingId(null);
    setText("");
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await fetch(`${API}/ideas/${ideaId}/comments/${commentId}`, {
        method: "DELETE",
      });

      loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comment Input */}
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your comment..."
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
        >
          {editingId ? "Update Comment" : "Post Comment"}
        </button>

        {editingId && (
          <button
            onClick={handleCancel}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Comments */}
      <div className="mt-8 space-y-5">
        {comments.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No comments yet.
          </div>
        )}

        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-4 border-b pb-5 last:border-none"
          >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {(comment.userName || "U")
                .substring(0, 2)
                .toUpperCase()}
            </div>

            {/* Body */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {comment.userName}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(comment)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}