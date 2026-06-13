import Link from "next/link";

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

  return (
    <div className="carousel w-full rounded-3xl overflow-hidden shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full"
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-[500px] md:h-[650px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="max-w-2xl text-white space-y-6">
                <div className="badge badge-primary badge-lg">
                  🚀 Startup Innovation Hub
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/ideas"
                    className="btn btn-primary btn-lg"
                  >
                    Explore Ideas
                  </Link>

                  <Link
                    href="/add-idea"
                    className="btn btn-outline btn-lg text-white border-white hover:border-primary"
                  >
                    Share Your Idea
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? slides.length : index}`}
              className="btn btn-circle btn-outline text-white"
            >
              ❮
            </a>

            <a
              href={`#slide${
                index === slides.length - 1 ? 1 : index + 2
              }`}
              className="btn btn-circle btn-outline text-white"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;