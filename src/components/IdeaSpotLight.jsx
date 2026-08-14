"use client";

import Link from "next/link";

const featuredIdea = {
  title: "Startup Team Finder",
  category: "Business",
  description:
    "A networking platform for entrepreneurs seeking co-founders. Entrepreneurs can create profiles, showcase skills, and connect with developers, designers, and marketers to build startups together.",
  budget: "$8,500",
  audience: "Startup founders and developers",
  tags: ["Startup", "Networking"],
};

const IdeaSpotlight = () => {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
            💡 Idea Spotlight
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            An idea worth
            <span className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              building.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Every great startup begins with a simple idea. Discover one of the
            ideas getting attention on IdeaVolt.
          </p>
        </div>

        {/* Spotlight Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">

          {/* Decorative gradients */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2">

            {/* Left side */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-300 ring-1 ring-purple-400/20">
                  {featuredIdea.category}
                </span>

                <span className="text-sm text-slate-500">
                  Featured Idea
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-7 text-4xl font-bold leading-tight text-white sm:text-5xl">
                {featuredIdea.title}
              </h3>

              {/* Description */}
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                {featuredIdea.description}
              </p>

              {/* Tags */}
              <div className="mt-7 flex flex-wrap gap-2">
                {featuredIdea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="mt-9">
                <Link
                  href="/ideas"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-purple-100"
                >
                  Explore this idea

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side */}
            <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-8 sm:p-12">

              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Floating idea card */}
              <div className="relative flex h-full items-center justify-center">

                <div className="w-full max-w-md rotate-[-2deg] rounded-3xl bg-white p-6 shadow-2xl transition duration-500 hover:rotate-0">

                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                      🚀
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                      Promising
                    </span>
                  </div>

                  <h4 className="mt-6 text-2xl font-bold text-gray-900">
                    {featuredIdea.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Find the right people to turn ambitious startup ideas into
                    real products.
                  </p>

                  {/* Stats */}
                  <div className="mt-7 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-400">
                        Estimated Budget
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {featuredIdea.budget}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-400">
                        Target Audience
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {featuredIdea.audience}
                      </p>
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="font-medium text-gray-500">
                        Community interest
                      </span>

                      <span className="font-bold text-purple-600">
                        78%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">
                    <div className="flex -space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200 text-xs">
                        👨
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-200 text-xs">
                        👩
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-xs">
                        👨
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-gray-500">
                      People are discussing
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom mini CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row">

          <div>
            <p className="font-semibold text-gray-900">
              Have an idea better than this?
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Put your idea in front of the IdeaVolt community.
            </p>
          </div>

          <Link
            href="/add-idea"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            Share Your Idea →
          </Link>

        </div>

      </div>
    </section>
  );
};

export default IdeaSpotlight;