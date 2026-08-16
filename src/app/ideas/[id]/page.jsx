import Image from "next/image";
import Comments from "./Comments";

const IdeasDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/ideas/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch idea");
  }

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

  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* IDEA CARD */}
      <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">

        {/* Image */}
        <div className="relative h-64 w-full">
          <Image
            alt={title}
            src={imageURL}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6">

          {/* Category */}
          <span className="mb-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            {category}
          </span>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {title}
          </h1>

          {/* Author */}
          <div className="mb-4 flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-xs font-bold text-white">
              {(postedBy || "User")
                .substring(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {postedBy || "Unknown User"}
              </p>

              {postedDate && (
                <p className="text-xs text-gray-500">
                  {new Date(postedDate).toLocaleDateString()}
                </p>
              )}
            </div>

          </div>

          {/* Description */}
          <p className="mb-4 leading-relaxed text-gray-700">
            {shortDescription}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="mb-6" />

          {/* Details */}
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div>
              <h3 className="mb-1 text-sm text-gray-500">
                Target Audience
              </h3>

              <p className="font-semibold text-gray-900">
                {targetAudience}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm text-gray-500">
                Budget
              </h3>

              <p className="font-semibold text-gray-900">
                ${Number(estimatedBudget || 0).toLocaleString()}
              </p>
            </div>

          </div>

          {/* Problem */}
          <div className="mb-6">
            <h3 className="mb-1 text-sm text-gray-500">
              Problem Statement
            </h3>

            <p className="text-gray-800">
              {problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="mb-1 text-sm text-gray-500">
              Proposed Solution
            </h3>

            <p className="text-gray-800">
              {proposedSolution}
            </p>
          </div>

        </div>
      </div>

      {/* COMMENTS */}
      <Comments ideaId={id} />

    </div>
  );
};

export default IdeasDetailsPage;