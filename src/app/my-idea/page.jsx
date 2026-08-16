"use client";

import React, { useEffect, useState } from "react";
import IdeaCard from "@/components/IdeaCard";
import { authClient } from "@/lib/auth-client";

const MyIdeaPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [editingIdea, setEditingIdea] = useState(null);

  // Toast
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // =========================
  // TOAST
  // =========================

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  // =========================
  // LOAD MY IDEAS
  // =========================

  const loadIdeas = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/my-ideas?email=${encodeURIComponent(
          user.email
        )}`
      );

      if (!res.ok) {
        throw new Error("Failed to load ideas");
      }

      const data = await res.json();

      setIdeas(data || []);

    } catch (error) {
      console.error(error);

      showToast(
        "Failed to load your ideas",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadIdeas();
    }
  }, [user?.email]);

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this idea?"
    );

    if (!confirmed) return;

    try {

      const res = await fetch(
        `http://localhost:5000/ideas/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      // Remove from UI immediately
      setIdeas((prev) =>
        prev.filter((idea) => idea._id !== id)
      );

      showToast(
        "Idea deleted successfully!",
        "success"
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Failed to delete idea",
        "error"
      );
    }
  };

  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (idea) => {
    setEditingIdea({
      ...idea,
    });
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        `http://localhost:5000/ideas/${editingIdea._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: editingIdea.title,
            shortDescription:
              editingIdea.shortDescription,

            detailedDescription:
              editingIdea.detailedDescription,

            category: editingIdea.category,

            tags: editingIdea.tags,

            imageURL: editingIdea.imageURL,

            estimatedBudget:
              editingIdea.estimatedBudget,

            targetAudience:
              editingIdea.targetAudience,

            problemStatement:
              editingIdea.problemStatement,

            proposedSolution:
              editingIdea.proposedSolution,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Update failed"
        );
      }

      // Update UI
      setIdeas((prev) =>
        prev.map((idea) =>
          idea._id === editingIdea._id
            ? editingIdea
            : idea
        )
      );

      setEditingIdea(null);

      showToast(
        "Idea updated successfully!",
        "success"
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Failed to update idea",
        "error"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (isPending || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <h2 className="text-3xl font-bold">
            Please Login
          </h2>

          <p className="mt-2 text-gray-500">
            You need to login to view your ideas.
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-base-200">

      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            My Ideas
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and edit your submitted startup concepts.
          </p>

        </div>

        {/* =========================
            NO IDEAS
        ========================= */}

        {ideas.length === 0 ? (

          <div className="rounded-xl bg-white py-20 text-center shadow">

            <h2 className="text-2xl font-bold text-gray-700">
              No ideas found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't submitted any ideas yet.
            </p>

          </div>

        ) : (

          /* =========================
             IDEA GRID
          ========================= */

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {ideas.map((idea) => (

              <div
                key={idea._id}
                className="relative"
              >

                {/* ACTION BUTTONS */}

                <div className="absolute right-3 top-3 z-20 flex gap-2">

                  <button
                    onClick={() => handleEdit(idea)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(idea._id)
                    }
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

                <IdeaCard idea={idea} />

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}

      {editingIdea && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

              <h2 className="text-2xl font-bold">
                Edit Idea
              </h2>

              <button
                onClick={() =>
                  setEditingIdea(null)
                }
                className="text-2xl text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleUpdate}
              className="space-y-5 p-6"
            >

              {/* TITLE */}

              <div>

                <label className="mb-1 block font-semibold">
                  Idea Title
                </label>

                <input
                  type="text"
                  value={editingIdea.title || ""}
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      title: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  required
                />

              </div>

              {/* SHORT DESCRIPTION */}

              <div>

                <label className="mb-1 block font-semibold">
                  Short Description
                </label>

                <textarea
                  value={
                    editingIdea.shortDescription || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      shortDescription:
                        e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  required
                />

              </div>

              {/* DETAILED DESCRIPTION */}

              <div>

                <label className="mb-1 block font-semibold">
                  Detailed Description
                </label>

                <textarea
                  value={
                    editingIdea.detailedDescription || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      detailedDescription:
                        e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                  rows="5"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-1 block font-semibold">
                  Category
                </label>

                <select
                  value={editingIdea.category || ""}
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      category: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option>Technology</option>
                  <option>
                    Artificial Intelligence
                  </option>
                  <option>Health</option>
                  <option>Education</option>
                  <option>Finance</option>
                  <option>E-Commerce</option>
                  <option>Environment</option>
                  <option>Transportation</option>
                  <option>Agriculture</option>
                  <option>Other</option>

                </select>

              </div>

              {/* BUDGET */}

              <div>

                <label className="mb-1 block font-semibold">
                  Estimated Budget
                </label>

                <input
                  type="number"
                  value={
                    editingIdea.estimatedBudget || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      estimatedBudget:
                        e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                />

              </div>

              {/* TAGS */}

              <div>

                <label className="mb-1 block font-semibold">
                  Tags
                </label>

                <input
                  type="text"
                  value={editingIdea.tags || ""}
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      tags: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                />

              </div>

              {/* IMAGE */}

              <div>

                <label className="mb-1 block font-semibold">
                  Image URL
                </label>

                <input
                  type="url"
                  value={editingIdea.imageURL || ""}
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      imageURL: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  required
                />

              </div>

              {/* TARGET */}

              <div>

                <label className="mb-1 block font-semibold">
                  Target Audience
                </label>

                <input
                  type="text"
                  value={
                    editingIdea.targetAudience || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      targetAudience:
                        e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                />

              </div>

              {/* PROBLEM */}

              <div>

                <label className="mb-1 block font-semibold">
                  Problem Statement
                </label>

                <textarea
                  value={
                    editingIdea.problemStatement || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      problemStatement:
                        e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                  rows="4"
                />

              </div>

              {/* SOLUTION */}

              <div>

                <label className="mb-1 block font-semibold">
                  Proposed Solution
                </label>

                <textarea
                  value={
                    editingIdea.proposedSolution || ""
                  }
                  onChange={(e) =>
                    setEditingIdea({
                      ...editingIdea,
                      proposedSolution:
                        e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                  rows="4"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setEditingIdea(null)
                  }
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =========================
          TOAST
      ========================= */}

      {toast.show && (

        <div className="toast toast-end toast-bottom z-[100]">

          <div
            className={`alert ${
              toast.type === "success"
                ? "alert-success"
                : "alert-error"
            }`}
          >

            <span>
              {toast.message}
            </span>

          </div>

        </div>

      )}

    </div>
  );
};

export default MyIdeaPage;