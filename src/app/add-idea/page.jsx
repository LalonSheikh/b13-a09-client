"use client";

import { useState } from "react";

const AddIdeaPage = () => {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());

    console.log(idea, "idea");

    const res = await fetch("http://localhost:5000/idea", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(idea),
    });

    const data = await res.json();
    if(data){
      alert('idea added successfully')
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen mx-auto bg-base-200 py-15 px-4">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add Idea
          </h1>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Idea Title */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-lg">
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
                  <span className="label-text font-semibold text-lg">
                    Short Description *
                  </span>
                </label>
                <textarea
                  name="shortDescription"
                  rows="3"
                  placeholder="Briefly describe your idea..."
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Detailed Description *
                  </span>
                </label>
                <textarea
                  name="detailedDescription"
                  rows="6"
                  placeholder="Explain your startup idea in detail..."
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Category & Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Category *</span>
                  </label>

                  <select
                    className="select select-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    Tags (Optional)
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
                  <span className="label-text font-semibold">Image URL *</span>
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
                  placeholder="Students, Small Businesses, Developers..."
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Problem Statement */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Problem Statement *
                  </span>
                </label>
                <textarea
                  name="problemStatement"
                  rows="5"
                  placeholder="What problem does your startup solve?"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Proposed Solution */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Proposed Solution *
                  </span>
                </label>
                <textarea
                  name="proposedSolution"
                  rows="5"
                  placeholder="Describe your proposed solution..."
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full bg-linear-to-r from-primary to-secondary  text-white"
                >
                  Add Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIdeaPage;
