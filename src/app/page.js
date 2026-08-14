import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import IdeaCard from "@/components/IdeaCard";
import IdeaSpotlight from "@/components/IdeaSpotLight";
import React from "react";

const HomePage = async () => {
  const res = await fetch("http://localhost:5000/ideas?limit=6");
  const ideas = await res.json();
  return (
    <div>
      <Banner />
      <div>
        <h2 className="flex justify-center items-center text-4xl m-2 font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent ">
          Trending Ideas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container items-center mx-auto gap-3 px-5">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea}></IdeaCard>
          ))}
        </div>
      </div>
      <HowItWorks></HowItWorks>
      <IdeaSpotlight></IdeaSpotlight>
    </div>
  );
};

export default HomePage;
