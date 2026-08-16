"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920",
      title: "Turn Your Ideas Into The Next Big Startup",
      description:
        "Discover innovative business ideas, validate concepts, and connect with creative minds from around the world.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920",
      title: "Innovation Begins With One Great Idea",
      description:
        "Explore thousands of startup ideas shared by entrepreneurs, creators, and dreamers.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920",
      title: "Build, Share & Inspire",
      description:
        "Join a community where innovative ideas receive feedback, support, and opportunities for growth.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
      {/* ================= IMAGE ================= */}
      <img
        src={slide.image}
        alt={slide.title}
        className="h-[500px] w-full object-cover transition-all duration-700 md:h-[650px]"
      />

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>

      {/* ================= CONTENT ================= */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl space-y-6 text-white">

            {/* Badge */}
            <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              🚀 Startup Innovation Hub
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-200 md:text-xl">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <Link
                href="/ideas"
                className="btn btn-lg border-none bg-gradient-to-r from-primary to-secondary text-white"
              >
                Explore Ideas
              </Link>

              <Link
                href="/add-idea"
                className="btn btn-outline btn-lg border-white text-white hover:border-primary hover:bg-primary"
              >
                Share Your Idea
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* ================= PREVIOUS BUTTON ================= */}
      <button
        onClick={previousSlide}
        className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/30 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
      >
        ❮
      </button>

      {/* ================= NEXT BUTTON ================= */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/30 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
      >
        ❯
      </button>

      {/* ================= DOTS ================= */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;