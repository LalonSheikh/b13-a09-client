"use client";

import React, { useEffect, useState } from "react";
import IdeaCard from "@/components/IdeaCard";

const MyIdeaPage = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/ideas")
      .then((res) => res.json())
      .then((data) => {
        // Newest first
        const sortedIdeas = data.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );

        setIdeas(sortedIdeas);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h2 className="text-4xl font-bold mb-8">My Ideas</h2>

      {ideas.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No ideas found.
        </div>
      )}
    </div>
  );
};

export default MyIdeaPage;