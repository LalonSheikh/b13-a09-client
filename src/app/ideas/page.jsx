import IdeaCard from "@/components/IdeaCard";
import React from "react";

const IdeaPage = async () => {
  const res = await fetch("http://localhost:5000/ideas");
  const ideas = await res.json();

  console.log(ideas);
  return <div> 
     <div className="max-w-7xl mx-auto">
      <h2>Ideas All</h2>
      <div className="grid grid-cols-4 container mx-auto gap-2">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea._id}
            idea={idea}
          ></IdeaCard>
        ))}
      </div>
    </div>
     </div>;
};

export default IdeaPage;
