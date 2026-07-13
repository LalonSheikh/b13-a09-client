"use client";

import { useEffect, useMemo, useState } from "react";
import IdeaCard from "@/components/IdeaCard";
import { FaSearch } from "react-icons/fa";

const categories = [
  "All",
  "Tech",
  "AI",
  "Health",
  "Education",
  "Finance",
  "Productivity",
];

const IdeaPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    fetch("http://localhost:5000/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((idea) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
          idea.title?.toLowerCase().includes(searchText) ||
          idea.shortDescription?.toLowerCase().includes(searchText) ||
          idea.category?.toLowerCase().includes(searchText) ||
          idea.tags?.toLowerCase().includes(searchText);

        const matchesCategory =
          category === "All" || idea.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }

        if (sortBy === "Oldest") {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }

        if (sortBy === "A-Z") {
          return a.title.localeCompare(b.title);
        }

        return 0;
      });
  }, [ideas, search, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h2 className="text-4xl font-bold mb-8">Browse Ideas</h2>

      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <label className=" flex items-center gap-2 w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, category or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <select
          className="select select-bordered w-full lg:w-60"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          className="select select-bordered w-full lg:w-48"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>A-Z</option>
        </select>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-20 text-gray-500">No ideas found.</div>
      )}
    </div>
  );
};

export default IdeaPage;
