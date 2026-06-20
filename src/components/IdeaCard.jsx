
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt, FaRegCalendar } from "react-icons/fa";
import { PiMapPinLineBold } from "react-icons/pi";

const IdeaCard = ({ idea }) => {
  const { _id, title, shortDescription, estimatedBudget, imageURL,category } =
    idea;
  return (
    <div className="max-h-500px">
      <Image src={imageURL} height={400} width={400} alt={title} />
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
        </div>
      </div>
      <Link href={`/ideas/${_id}`}>
        {" "}
        <button  className="btn btn-ghost">
          Book Now <FaExternalLinkAlt />
        </button>
      </Link>
    </div>
  );
};

export default IdeaCard;
