"use client";

import { useEffect, useState } from "react";

export default function Comments({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadComments = async () => {
    const res = await fetch(
      `http://localhost:5000/ideas/${ideaId}/comments`
    );
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (editingId) {
      await fetch(
        `http://localhost:5000/ideas/${ideaId}/comments/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
          }),
        }
      );

      setEditingId(null);
    } else {
      await fetch(
        `http://localhost:5000/ideas/${ideaId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: "AJ",
            text,
          }),
        }
      );
    }

    setText("");
    loadComments();
  };

  const deleteComment = async (id) => {
    await fetch(
      `http://localhost:5000/ideas/${ideaId}/comments/${id}`,
      {
        method: "DELETE",
      }
    );

    loadComments();
  };

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl mb-4">
        Comments ({comments.length})
      </h2>

      <textarea
        className="textarea textarea-bordered w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment..."
      />

      <button
        onClick={handleSubmit}
        className="btn btn-primary mt-3"
      >
        {editingId ? "Update Comment" : "Post Comment"}
      </button>

      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {comment.userName}
              </h3>

              <div className="space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setEditingId(comment._id);
                    setText(comment.text);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-red-500"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mt-2">{comment.text}</p>

            <small className="text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}