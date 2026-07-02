import Banner from "@/components/Banner";
import IdeaCard from "@/components/IdeaCard";
import React from "react";

const HomePage = async () => {
  const res = await fetch("http://localhost:5000/ideas");
  const ideas1 = await res.json();
  const ideas = ideas1.slice(0, 6);
  return (
    <div>
      <Banner />
      <div>
        <h2 className="flex justify-center items-center text-4xl m-2 font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent ">
          Trending Ideas
        </h2>
        <div className="grid grid-cols-3 container mx-auto gap-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea}></IdeaCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
