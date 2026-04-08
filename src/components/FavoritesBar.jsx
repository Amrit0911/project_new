import React from "react";

const FavoritesBar = ({ favorites, pickCity, onRemove, darkMode }) => {
  if (!favorites.length) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap slide-right">
      <span className="text-white/35 text-[11px] uppercase tracking-widest font-semibold">
        Saved
      </span>
      {favorites.map((city) => (
        <div
          key={city}
          className={`flex items-center rounded-full border overflow-hidden transition-all duration-200 ${darkMode
              ? "bg-amber-400/12 border-amber-400/25 hover:bg-amber-400/20"
              : "bg-amber-400/15 border-amber-400/30 hover:bg-amber-400/25"
            }`}
        >
          <button
            id={`favorite-select-${city}`}
            onClick={() => pickCity(city)}
            className="pl-3 pr-2 py-1.5 text-amber-200 text-xs font-semibold hover:text-white transition-colors cursor-pointer"
          >
            ⭐ {city}
          </button>
          <button
            id={`favorite-remove-${city}`}
            onClick={() => onRemove(city)}
            className="btn-remove pr-2.5 py-1.5 text-yellow-300/40 text-xs cursor-pointer"
            title={`Remove ${city}`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesBar;
