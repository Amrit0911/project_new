import React from "react";
import {
  outfitLogic, getIconUrl, formatTime, getHumidityDesc, getWindDesc,
} from "../utils/weatherUtils";

const WeatherCard = ({ data, darkMode, isFavorite, toggleSaved }) => {
  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6);
  const rainProb = data.rain ? Math.round((data.rain["1h"] || 0) * 10) : 0;
  const condition = data.weather[0].description;
  const iconUrl = getIconUrl(data.weather[0].icon);
  const sunrise = formatTime(data.sys.sunrise);
  const sunset = formatTime(data.sys.sunset);
  const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : "N/A";
  const suggestions = outfitLogic(temp, rainProb, windSpeed, condition);

  const stats = [
    { icon: "💧", label: "Humidity", value: `${humidity}%`, sub: getHumidityDesc(humidity) },
    { icon: "💨", label: "Wind", value: `${windSpeed} km/h`, sub: getWindDesc(windSpeed) },
    { icon: "👁️", label: "Visibility", value: `${visibility} km`, sub: "" },
    { icon: "🌡️", label: "Feels Like", value: `${feelsLike}°C`, sub: "" },
    { icon: "📊", label: "Pressure", value: `${data.main.pressure}`, sub: "hPa" },
    { icon: "☁️", label: "Clouds", value: `${data.clouds.all}%`, sub: "coverage" },
  ];

  return (
    <div className={`fade-in-scale rounded-3xl overflow-hidden frosted-card ${darkMode ? "" : "frosted-card-light"
      }`}>

      <div className="px-6 pt-6 pb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm">📍</span>
            <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
              {data.name}
              <span className="text-white/40 font-medium text-base ml-2">{data.sys.country}</span>
            </h2>
          </div>
          <p className="text-white/50 text-xs capitalize mt-0.5 ml-5">{condition}</p>
        </div>

        <button
          id={`favorite-btn-${data.name}`}
          onClick={toggleSaved}
          className={`btn-favorite flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${isFavorite
              ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
              : "bg-white/8 text-white/50 border-white/15 hover:bg-white/15 hover:text-white/80"
            }`}
        >
          <span className="text-sm">{isFavorite ? "⭐" : "☆"}</span>
          {isFavorite ? "Saved" : "Save City"}
        </button>
      </div>


      <div className="px-6 pb-6 flex flex-wrap items-center gap-6">

        <div className="flex items-center gap-4">
          <img
            src={iconUrl}
            alt={condition}
            className="weather-icon-lg w-24 h-24 sm:w-28 sm:h-28"
          />
          <div>
            <div className="temp-pop text-[72px] sm:text-[88px] font-black text-white leading-none tracking-tighter">
              {temp}°
            </div>
            <div className="text-white/45 text-sm mt-1 font-medium">°C · Celsius</div>
          </div>
        </div>


        <div className="hidden sm:block w-px h-20 bg-white/10 self-center" />

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <span>🌅</span>
            <span>Sunrise <strong className="text-white ml-1">{sunrise}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span>🌇</span>
            <span>Sunset  <strong className="text-white ml-1">{sunset}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span>🌧️</span>
            <span>Rain prob <strong className="text-white ml-1">{rainProb}%</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span>💦</span>
            <span>Min / Max
              <strong className="text-blue-300 ml-1">{Math.round(data.main.temp_min)}°</strong>
              <span className="text-white/30 mx-1">/</span>
              <strong className="text-orange-300">{Math.round(data.main.temp_max)}°</strong>
            </span>
          </div>
        </div>
      </div>


      <div className="border-t border-white/8 grid grid-cols-3 sm:grid-cols-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`stat-card px-4 py-4 text-center ${i < stats.length - 1 ? "border-r border-white/8" : ""
              }`}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-white font-bold text-sm">{s.value}</div>
            {s.sub && <div className="text-white/40 text-[10px] mt-0.5">{s.sub}</div>}
            <div className="text-white/35 text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>


      {suggestions.length > 0 && (
        <div className="border-t border-white/8 px-6 py-4">
          <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-3">
            👗 &nbsp;What to Wear Today
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${s.priority === "high"
                    ? "bg-red-500/15 text-red-200 border-red-500/25"
                    : s.priority === "medium"
                      ? "bg-amber-500/15 text-amber-200 border-amber-500/25"
                      : "bg-emerald-500/15 text-emerald-200 border-emerald-500/25"
                  }`}
              >
                {s.text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
