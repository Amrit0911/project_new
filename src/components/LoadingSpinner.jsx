// LoadingSpinner.jsx — Professional loading state
import React from "react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 fade-in-scale">
    <div className="spin-slow text-6xl mb-5">🌤️</div>
    <div className="flex gap-1.5 mb-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-white/40 pulse-custom"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
    <p className="text-white/50 text-sm font-medium">Fetching weather data…</p>
  </div>
);

export default LoadingSpinner;
