import Image from "next/image";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { PiMapPinLineBold } from "react-icons/pi";

const IdeasDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/ideas/${id}`);
  const idea = await res.json();
  const { title, shortDescription, estimatedBudget, imageURL, category } = idea;

  console.log(idea);

  return (
    <div className="max-w-7xl mx-auto">
      <Image alt={title} src={imageURL} height={500} width={800}></Image>
       <h2>{shortDescription}</h2>
            <div className="flex justify-between items-center ">
              <div>
                <div className="flex items-center gap-2">
                  <PiMapPinLineBold /> <span>{category}</span>
                </div>
                <div>
                  <h2 className="text-xl font-black">{title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCalendar />
                  {estimatedBudget}
                </div>
              </div>
              <div>
                {" "}
                <span className="text-xl font-bold">${estimatedBudget}</span> /person
              </div> </div>
    </div>
  );
};

export default IdeasDetailsPage;
