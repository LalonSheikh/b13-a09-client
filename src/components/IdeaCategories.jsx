"use client";

import Link from "next/link";

const categories = [
  {
    name: "Technology",
    description: "Build the next generation of digital products.",
    count: "120+ Ideas",
    emoji: "💻",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "Artificial Intelligence",
    description: "Explore ideas powered by AI and automation.",
    count: "85+ Ideas",
    emoji: "🤖",
    gradient: "from-violet-600 to-purple-400",
  },
  {
    name: "Education",
    description: "Discover smarter ways to learn and teach.",
    count: "64+ Ideas",
    emoji: "🎓",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    name: "Health",
    description: "Ideas creating a healthier future.",
    count: "52+ Ideas",
    emoji: "❤️",
    gradient: "from-rose-500 to-pink-400",
  },
  {
    name: "Business",
    description: "Find opportunities that can become businesses.",
    count: "73+ Ideas",
    emoji: "📈",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    name: "Finance",
    description: "Innovative ideas for smarter financial lives.",
    count: "41+ Ideas",
    emoji: "💰",
    gradient: "from-green-600 to-lime-400",
  },
];

const IdeaCategories = () => {
  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
              Explore the possibilities
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Find ideas that
              <span className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                inspire you.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Browse ideas by category and discover opportunities that match
              your interests, skills, and ambitions.
            </p>
          </div>

          <Link
            href="/ideas"
            className="w-fit rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-purple-400 hover:text-purple-600"
          >
            Browse all ideas →
          </Link>
        </div>

        {/* Categories */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/ideas?category=${encodeURIComponent(category.name)}`}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Decorative circle */}
              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 transition duration-500 group-hover:scale-150`}
              />

              <div className="relative">

                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-2xl shadow-md`}
                >
                  {category.emoji}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-gray-900 transition group-hover:text-purple-600">
                  {category.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {category.description}
                </p>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-gray-500">
                    {category.count}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition duration-300 group-hover:bg-purple-100 group-hover:text-purple-600">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Can&apos;t find your category?
          </p>

          <Link
            href="/add-idea"
            className="mt-2 inline-block font-semibold text-purple-600 hover:text-purple-700"
          >
            Share a new idea with IdeaVolt →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IdeaCategories;