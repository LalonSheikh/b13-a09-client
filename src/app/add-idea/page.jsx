"use client";

import { authClient } from "@/lib/auth-client";
import { useRef, useState } from "react";

const AddIdeaPage = () => {
  const [category, setCategory] = useState("");
  const formRef = useRef(null);
  const { data: session } = authClient.useSession();

  const user = session?.user;

 const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.currentTarget;

  const formData = new FormData(form);

  const idea = Object.fromEntries(formData.entries());

  // Logged-in user information
  idea.postedBy = user?.name || "Unknown User";
  idea.postedByEmail = user?.email || "";
  idea.postedByImage = user?.image || "";
  idea.createdAt = new Date().toISOString();

  console.log("Idea:", idea);

  try {
    const res = await fetch("http://localhost:5000/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea),
    });

    if (!res.ok) {
      throw new Error("Failed to add idea");
    }

    const data = await res.json();

    console.log("Added:", data);

    form.reset();
    setCategory("");

    alert("Idea added successfully!");

  } catch (error) {
    console.error(error);
    alert("Failed to add idea");
  }
};

  return (
    <div className="min-h-screen bg-base-200 px-4 py-15">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-extrabold text-transparent">
            Add Idea
          </h1>

          <p className="mt-3 text-gray-500">
            Share your startup idea with the IdeaVolt community.
          </p>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-2xl">
          <div className="card-body p-8 md:p-12">

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Idea Title *
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter your startup idea title"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Short Description *
                  </span>
                </label>

                <textarea
                  name="shortDescription"
                  rows="3"
                  placeholder="Briefly describe your idea..."
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Detailed Description *
                  </span>
                </label>

                <textarea
                  name="detailedDescription"
                  rows="6"
                  placeholder="Explain your startup idea in detail..."
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              {/* Category + Budget */}
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Category *
                    </span>
                  </label>

                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Category</option>
                    <option>Technology</option>
                    <option>Artificial Intelligence</option>
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

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      Estimated Budget
                    </span>
                  </label>

                  <input
                    type="number"
                    name="estimatedBudget"
                    placeholder="e.g. 5000"
                    className="input input-bordered w-full"
                  />
                </div>

              </div>

              {/* Tags */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Tags
                  </span>
                </label>

                <input
                  type="text"
                  name="tags"
                  placeholder="AI, SaaS, Startup, Innovation"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Image URL *
                  </span>
                </label>

                <input
                  type="url"
                  name="imageURL"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Target Audience *
                  </span>
                </label>

                <input
                  type="text"
                  name="targetAudience"
                  placeholder="Students, Developers, Small Businesses..."
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Problem */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Problem Statement *
                  </span>
                </label>

                <textarea
                  name="problemStatement"
                  rows="5"
                  placeholder="What problem does your startup solve?"
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              {/* Solution */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Proposed Solution *
                  </span>
                </label>

                <textarea
                  name="proposedSolution"
                  rows="5"
                  placeholder="Describe your proposed solution..."
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full bg-gradient-to-r from-primary to-secondary text-white"
              >
                Add Idea
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIdeaPage;