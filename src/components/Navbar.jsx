// Navbar.jsx — Minimal premium top bar
import React from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => (
  <nav className={`sticky top-0 z-50 frosted-card fade-in-down border-b ${
    darkMode ? "border-white/10" : "border-black/10 frosted-card-light"
  }`}>
    <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">🌤️</span>
        <div className="leading-none">
          <span className="font-bold text-white text-base tracking-tight">SmartWeather</span>
          <span className={`block text-[10px] font-medium tracking-widest uppercase mt-0.5 ${
            darkMode ? "text-white/40" : "text-white/50"
          }`}>Real-time · AI Powered</span>
        </div>
      </div>

      {/* Dark mode toggle */}
      <button
        id="dark-mode-toggle"
        onClick={toggleDarkMode}
        className={`toggle-glow btn-ghost flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border ${
          darkMode
            ? "bg-white/8 border-white/15 text-white/80 hover:bg-white/15"
            : "bg-black/10 border-white/20 text-white/80 hover:bg-black/20"
        }`}
        aria-label="Toggle dark mode"
      >
        <span className="text-base leading-none">{darkMode ? "☀️" : "🌙"}</span>
        <span className="hidden sm:block">{darkMode ? "Light" : "Dark"}</span>
      </button>
    </div>
  </nav>
);

export default Navbar;
