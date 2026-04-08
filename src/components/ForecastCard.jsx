import React, { useState } from "react";
import { getIconUrl, formatShortDay, outfitLogic } from "../utils/weatherUtils";

const ForecastCard = ({ info, darkMode, index }) => {
  const [open, setOpen] = useState(false);

  const iconUrl = getIconUrl(info.weather[0].icon);
  const condition = info.weather[0].description;
  const windSpeed = Math.round((info.wind?.speed || 0) * 3.6);
  const suggestions = outfitLogic(info.avgTemp, info.rainProb, windSpeed, condition);


  const rainW = Math.min(100, info.rainProb);

  return (
    <div
      className={`forecast-card frosted-card ${darkMode ? "" : "frosted-card-light"} rounded-2xl overflow-hidden fade-in-up`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >

      <div className="p-4">

        <p className="text-white/45 text-[10px] uppercase tracking-widest font-semibold text-center mb-3">
          {formatShortDay(info.dt)}
        </p>


        <div className="flex justify-center mb-2">
          <img src={iconUrl} alt={condition} className="weather-icon-sm w-12 h-12" />
        </div>


        <div className="text-center mb-1">
          <span className="text-white font-black text-2xl">{info.avgTemp}°</span>
        </div>


        <div className="flex justify-center gap-2 text-xs mb-3">
          <span className="text-blue-300 font-medium">↓{info.minTemp}°</span>
          <span className="text-white/20">|</span>
          <span className="text-orange-300 font-medium">↑{info.maxTemp}°</span>
        </div>


        <p className="text-white/45 text-[10px] capitalize text-center mb-3 truncate px-1">
          {condition}
        </p>


        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-white/40 mb-1">
            <span>🌧️ Rain</span>
            <span className="text-blue-300 font-medium">{info.rainProb}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
              style={{ width: `${rainW}%` }}
            />
          </div>
        </div>


        <div className="grid grid-cols-2 gap-1.5 mb-3">
          <div className="bg-white/8 rounded-lg p-2 text-center">
            <div className="text-[10px] text-white/35">Humidity</div>
            <div className="text-white text-xs font-bold">{info.main.humidity}%</div>
          </div>
          <div className="bg-white/8 rounded-lg p-2 text-center">
            <div className="text-[10px] text-white/35">Wind</div>
            <div className="text-white text-xs font-bold">{windSpeed}<span className="text-white/40 font-normal"> km/h</span></div>
          </div>
        </div>


        <button
          id={`view-details-btn-${index}`}
          onClick={() => setOpen(!open)}
          className={`btn-ghost w-full py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer border transition-colors ${darkMode
              ? "bg-white/6 border-white/10 text-white/50 hover:bg-white/12 hover:text-white/80"
              : "bg-white/10 border-white/15 text-white/50 hover:bg-white/20 hover:text-white/80"
            }`}
        >
          {open ? "▲ Less" : "▼ Details"}
        </button>
      </div>

      {open && (
        <div className="details-expand border-t border-white/8 px-4 pt-3 pb-4">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Outfit Tips</p>
          <div className="flex flex-col gap-1.5">
            {suggestions.length > 0
              ? suggestions.map((s, i) => (
                <p key={i} className="text-white/70 text-[11px] bg-white/6 rounded-lg px-2.5 py-1.5 leading-tight">
                  {s.text}
                </p>
              ))
              : <p className="text-white/35 text-xs">No specific suggestions.</p>
            }
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            <div className="bg-white/8 rounded-lg p-2 text-center">
              <div className="text-[10px] text-white/35">Pressure</div>
              <div className="text-white text-xs font-bold">{info.main.pressure} <span className="text-white/40 font-normal">hPa</span></div>
            </div>
            <div className="bg-white/8 rounded-lg p-2 text-center">
              <div className="text-[10px] text-white/35">Feels Like</div>
              <div className="text-white text-xs font-bold">{Math.round(info.main.feels_like)}°C</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastCard;
