"use client";

import me1 from "@/public/me1.jpeg";
import me2 from "@/public/me2.jpg";
import me3 from "@/public/me3.jpg";
import me4 from "@/public/me4.jpg";
import me5 from "@/public/me5.jpg";
import me6 from "@/public/me6.jpg";

import { useState, useEffect } from "react";
import Image from "next/image";

type SlideshowProps = {
  interval?: number; // Milliseconds between slides (default: 3000)
  className?: string;
};

export default function Slideshow({
  interval = 3000,
  className = "",
}: SlideshowProps) {
  // Fixed size for 900x1200 images (3:4 ratio)
  const images = [me1, me2, me3, me4, me5, me6];

  const width = 900;
  const height = 1200;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  //   const goToPrevious = () => {
  //     setIsTransitioning(true);
  //     setTimeout(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === 0 ? images.length - 1 : prevIndex - 1,
  //       );
  //       setIsTransitioning(false);
  //     }, 500);
  //   };

  //   const goToNext = () => {
  //     setIsTransitioning(true);
  //     setTimeout(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //       setIsTransitioning(false);
  //     }, 500);
  //   };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Images Container */}
      <div className="relative w-full h-full overflow-hidden rounded-[100px] bg-black">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              pointerEvents: index === currentIndex ? "auto" : "none",
            }}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="900px"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {/* <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button> */}

      {/* Next Button */}
      {/* <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
