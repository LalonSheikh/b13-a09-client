"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Comments({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000";

  // =========================
  // GET LOGGED-IN USER
  // =========================
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const user = session?.user;

  // =========================
  // LOAD COMMENTS
  // =========================
  const loadComments = async () => {
    try {
      const res = await fetch(`${API}/ideas/${ideaId}/comments`);

      if (!res.ok) {
        throw new Error("Failed to load comments");
      }

      const data = await res.json();

      setComments(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    loadComments();
  }, [ideaId]);

  // =========================
  // SUBMIT COMMENT
  // =========================
  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to comment.");
      return;
    }

    if (!text.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    setLoading(true);

    try {
      // =========================
      // EDIT COMMENT
      // =========================
      if (editingId) {
        const res = await fetch(
          `${API}/ideas/${ideaId}/comments/${editingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: text.trim(),
              userId: user.id,
            }),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to update comment");
        }

        toast.success("Comment updated successfully!");

        setText("");
        setEditingId(null);

        await loadComments();
      }

      // =========================
      // ADD NEW COMMENT
      // =========================
      else {
        const res = await fetch(`${API}/ideas/${ideaId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            userName: user.name,
            photoURL: user.image || "",
            text: text.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to post comment");
        }

        toast.success("Comment posted successfully!");

        setText("");

        await loadComments();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (comment) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (comment.userId !== user.id) {
      toast.error("You can only edit your own comment.");
      return;
    }

    setEditingId(comment._id);
    setText(comment.text);

    toast("Editing your comment...");
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancel = () => {
    setEditingId(null);
    setText("");

    toast("Edit cancelled");
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (comment) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (comment.userId !== user.id) {
      toast.error("You can only delete your own comment.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API}/ideas/${ideaId}/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete comment");
      }

      toast.success("Comment deleted successfully!");

      await loadComments();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete comment.");
    }
  };

  // =========================
  // LOADING SESSION
  // =========================
  if (sessionLoading) {
    return (
      <div className="mt-10 rounded-xl border bg-white p-6 shadow">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border bg-white p-6 shadow">
      {/* ================= HEADER ================= */}
      <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
        Comments ({comments.length})
      </h2>

      {/* ================= COMMENT INPUT ================= */}

      {user ? (
        <>
          <div className="mb-4 flex items-center gap-3">
            {/* Current user image */}
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={42}
                height={42}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>

              <p className="text-xs text-gray-500">
                Commenting as {user.email}
              </p>
            </div>
          </div>

          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!user}
            placeholder={
              user ? "Add your comment..." : "Please login to comment..."
            }
            className="w-full resize-none rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          />

          <div className="mt-4 flex gap-3">
           <button
  onClick={handleSubmit}
  disabled={!user || !text.trim()}
  className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {editingId ? "Update Comment" : "Post Comment"}
</button>

            {editingId && (
              <button
                onClick={handleCancel}
                className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <p className="text-gray-700">Please login to post a comment.</p>
        </div>
      )}

      {/* ================= COMMENTS ================= */}

      <div className="mt-8 space-y-5">
        {comments.length === 0 && (
          <div className="py-6 text-center text-gray-500">No comments yet.</div>
        )}

        {comments.map((comment) => {
          // IMPORTANT
          // Check whether this comment belongs to current user
          const isOwner = user && comment.userId === user.id;

          return (
            <div
              key={comment._id}
              className="flex gap-4 border-b pb-5 last:border-none"
            >
              {/* ================= AVATAR ================= */}

              {comment.photoURL ? (
                <Image
                  src={comment.photoURL}
                  alt={comment.userName || "User"}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 font-bold text-white">
                  {(comment.userName || "U").substring(0, 2).toUpperCase()}
                </div>
              )}

              {/* ================= BODY ================= */}

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {comment.userName || "Unknown User"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : ""}
                    </p>
                  </div>

                  {/* ================= EDIT DELETE ================= */}

                  {isOwner && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(comment)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(comment)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Comment text */}
                <p className="mt-3 whitespace-pre-wrap text-gray-700">
                  {comment.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
