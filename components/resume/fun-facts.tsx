"use client";

import { useState, useEffect } from "react";

type FunFactsProps = {
  facts: string[];
  interval?: number; // Milliseconds between facts (default: 4000)
  className?: string;
};

export default function FunFacts({
  facts,
  interval = 5000,
  className = "",
}: FunFactsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (facts.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % facts.length);
        setIsTransitioning(false);
      }, 500); // Match this with CSS transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [facts.length, interval]);

  if (facts.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Fun Facts Container */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30 min-h-[120px] flex items-center justify-center">
        <div className="relative w-full">
          {facts.map((fact, index) => (
            <p
              key={index}
              className={`text-center text-lg text-gray-200 transition-opacity duration-500 ${
                index === currentIndex
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0"
              }`}
            >
              💡 <span className="font-medium">{fact}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {facts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-purple-500 w-6"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to fact ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
