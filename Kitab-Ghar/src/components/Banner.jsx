import React from "react";
import { ArrowRight } from "lucide-react";

const Banner = ({
  title = "Summer Reading Collection",
  subtitle = "Discover our handpicked selection of books perfect for your summer reading list",
  ctaText = "Browse Collection",
  onCtaClick = () => {},
  backgroundImage = "/placeholder.svg?height=500&width=1200",
}) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-white/90 text-base sm:text-lg mb-6 max-w-xl">
          {subtitle}
        </p>
        <button
          onClick={onCtaClick}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors w-fit"
        >
          {ctaText} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
