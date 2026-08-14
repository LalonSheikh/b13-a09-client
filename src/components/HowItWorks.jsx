"use client";

import Link from "next/link";
import {
  Lightbulb,
  Search,
  Users,
  Rocket,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Share Your Idea",
    description:
      "Turn your thoughts into a clear startup concept and share it with the IdeaVolt community.",
  },
  {
    number: "02",
    icon: Search,
    title: "Explore Ideas",
    description:
      "Discover creative ideas across technology, AI, education, business, health, and more.",
  },
  {
    number: "03",
    icon: Users,
    title: "Connect & Discuss",
    description:
      "Meet people with similar interests, exchange feedback, and improve ideas together.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Build the Future",
    description:
      "Take promising ideas from imagination to execution with the right people and resources.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-10">
      
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
            <Sparkles size={16} />
            From idea to impact
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              IdeaVolt
            </span>{" "}
            works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Great ideas become powerful when they are shared, discussed,
            improved, and built together.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="group relative">

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(100%+8px)] top-12 hidden w-10 border-t border-dashed border-slate-700 lg:block" />
                )}

                <div className="relative h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-slate-900">

                  {/* Number */}
                  <div className="absolute right-6 top-6 text-sm font-bold text-slate-700">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg shadow-purple-900/30 transition duration-300 group-hover:scale-110">
                    <Icon size={25} />
                  </div>

                  {/* Text */}
                  <h3 className="mt-7 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>

                  {/* Bottom line */}
                  <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-900/60 p-7 sm:p-9 md:flex-row">

          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              Have an idea waiting to be discovered?
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Share it with the IdeaVolt community today.
            </p>
          </div>

          <Link
            href="/add-idea"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-purple-100"
          >
            Add Your Idea

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;