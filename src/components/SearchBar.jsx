import React, { useState } from "react";

const SearchBar = ({ doSearch, getLoc, loading, darkMode }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) doSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-2xl mx-auto">

      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-base pointer-events-none">
          🔍
        </span>
        <input
          id="city-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city — London, Tokyo, Mumbai..."
          disabled={loading}
          className={`search-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium border outline-none text-white placeholder-white/35 ${darkMode
              ? "bg-white/10 border-white/15 focus:border-white/35"
              : "bg-white/15 border-white/20 focus:border-white/45"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </div>


      <button
        id="search-btn"
        type="submit"
        disabled={loading || !query.trim()}
        className="btn-primary px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {loading ? "···" : "Search"}
      </button>


      <button
        id="detect-location-btn"
        type="button"
        onClick={getLoc}
        disabled={loading}
        className={`btn-ghost flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border whitespace-nowrap ${darkMode
            ? "bg-white/8 border-white/15 text-white/75 hover:bg-white/15"
            : "bg-white/12 border-white/20 text-white/75 hover:bg-white/20"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        title="Auto-detect my location"
      >
        <span>📍</span>
        <span className="hidden sm:inline">Locate Me</span>
      </button>
    </form>
  );
};

export default SearchBar;
