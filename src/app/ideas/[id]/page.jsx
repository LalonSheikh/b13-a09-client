// import Image from "next/image";
// import React from "react";
// import { FaRegCalendar } from "react-icons/fa";
// import { PiMapPinLineBold } from "react-icons/pi";

// const IdeasDetailsPage = async ({ params }) => {
//   const { id } = await params;

//   const res = await fetch(`http://localhost:5000/ideas/${id}`);
//   const idea = await res.json();
//   const { title, shortDescription, estimatedBudget, imageURL, category } = idea;

//   console.log(idea);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <Image alt={title} src={imageURL} height={500} width={800}></Image>
//        <h2>{shortDescription}</h2>
//             <div className="flex justify-between items-center ">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <PiMapPinLineBold /> <span>{category}</span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-black">{title}</h2>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaRegCalendar />
//                   {estimatedBudget}
//                 </div>
//               </div>
//               <div>
//                 {" "}
//                 <span className="text-xl font-bold">${estimatedBudget}</span> /person
//               </div> </div>
//     </div>
//   );
// };

// export default IdeasDetailsPage;

import Image from "next/image";
import React from "react";

const IdeasDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/ideas/${id}`);
  const idea = await res.json();

  const {
  title,
  shortDescription,
  estimatedBudget,
  imageURL,
  category,
  postedBy,
  postedDate,
  tags,
  targetAudience,
  problemStatement,
  proposedSolution,
} = idea;

// Normalize tags into an array regardless of what the API returns
const tagList = Array.isArray(tags)
  ? tags
  : typeof tags === "string"
  ? tags.split(",").map((t) => t.trim()).filter(Boolean)
  : [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Cover Image */}
        <div className="relative w-full h-64">
          <Image alt={title} src={imageURL} fill className="object-cover" />
        </div>

        <div className="p-6">
          {/* Category badge */}
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
            {category}
          </span>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>

          {/* Author + Date */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center font-semibold">
              {postedBy?.slice(0, 2).toUpperCase() || "UN"}
            </div>
            <span className="text-sm text-gray-500">{postedDate}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-4">
            {shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="mb-6" />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Target Audience</h3>
              <p className="font-semibold text-gray-900">{targetAudience}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Budget</h3>
              <p className="font-semibold text-gray-900">
                ${estimatedBudget?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-1">Problem Statement</h3>
            <p className="text-gray-800">{problemStatement}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Proposed Solution</h3>
            <p className="text-gray-800">{proposedSolution}</p>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Comments (0)</h2>
        <textarea
          placeholder="Add your comment..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
        <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default IdeasDetailsPage;
