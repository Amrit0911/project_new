import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import FavoritesBar from "./components/FavoritesBar";
import LoadingSpinner from "./components/LoadingSpinner";
import useWeatherAPI from "./hooks/useWeather";
import { pickBgTheme } from "./utils/weatherUtils";


const QUICK_CITIES = [
  { name: "New York", flag: "🇺🇸" },
  { name: "London", flag: "🇬🇧" },
  { name: "Tokyo", flag: "🇯🇵" },
  { name: "Mumbai", flag: "🇮🇳" },
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Sydney", flag: "🇦🇺" },
  { name: "Paris", flag: "🇫🇷" },
  { name: "Singapore", flag: "🇸🇬" },
];

const FEATURES = [
  { icon: "📍", title: "Auto-Detect", desc: "GPS location in one click" },
  { icon: "👗", title: "Outfit AI", desc: "Smart wear suggestions" },
  { icon: "📅", title: "5-Day Forecast", desc: "Daily high/low & rain chance" },
  { icon: "🔃", title: "Sort & Filter", desc: "By temp range or order" },
  { icon: "⭐", title: "Favorites", desc: "Save cities to localStorage" },
  { icon: "🌙", title: "Dark Mode", desc: "Persistent theme preference" },
];

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const s = localStorage.getItem("sw_dark");
    return s ? JSON.parse(s) : true;
  });

  const [favorites, setFavorites] = useState(() => {
    const s = localStorage.getItem("sw_favorites");
    return s ? JSON.parse(s).filter((c) => typeof c === "string") : [];
  });

  const { weather, forecast, loading, error, getCityData, useMyGPS } = useWeatherAPI();


  useEffect(() => { localStorage.setItem("sw_dark", JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { localStorage.setItem("sw_favorites", JSON.stringify(favorites)); }, [favorites]);

  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), []);

  const toggleSaved = useCallback(() => {
    if (!weather) return;
    const city = weather.name;
    setFavorites((prev) =>
      prev.find((c) => c === city)          
        ? prev.filter((c) => c !== city)    
        : [...prev, city]
    );
  }, [weather]);

  const handleRemoveFavorite = useCallback((city) => {
    setFavorites((prev) => prev.filter((c) => c !== city));
  }, []);

  const isFavorite = weather
    ? !!favorites.find((c) => c === weather.name) 
    : false;

  const darkBg = weather
    ? pickBgTheme(Math.round(weather.main.temp), weather.weather[0].description)
    : "bg-cloudy";
  const bgClass = darkMode ? darkBg : "bg-light-mode";


  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-700 ${darkMode ? "" : "light-theme"}`}>
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")", opacity: 0.4 }}
      />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="relative max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-6">


        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar
              doSearch={getCityData}
              getLoc={useMyGPS}
              loading={loading}
              darkMode={darkMode}
            />
          </div>
        </div>
        {favorites.length > 0 && (
          <FavoritesBar
            favorites={favorites}
            onSelect={getCityData}
            onRemove={handleRemoveFavorite}
            darkMode={darkMode}
          />
        )}

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <div className="error-shake frosted-card rounded-2xl border border-red-500/25 bg-red-500/10 px-6 py-5 flex items-start gap-4 fade-in-scale">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <p className="text-white font-semibold text-sm">{error}</p>
              <p className="text-white/45 text-xs mt-0.5">
                Try another city name or check your internet connection.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="fade-in-up">

            <div className="text-center py-10">
              <div className="float-anim inline-block text-7xl mb-4">⛅</div>
              <h1 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-2">
                Your Personal Weather Dashboard
              </h1>
              <p className="text-white/45 text-base max-w-lg mx-auto mb-8">
                Search any city to get real-time weather, 5-day forecasts, and smart outfit recommendations powered by OpenWeatherMap.
              </p>

              <p className="text-white/30 text-[11px] uppercase tracking-widest mb-3">
                Quick Search
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {QUICK_CITIES.map((c, i) => (
                  <button
                    key={c.name}
                    id={`quick-city-${c.name.replace(" ", "-")}`}
                    onClick={() => getCityData(c.name)}
                    className={`btn-pill frosted-card px-4 py-2 rounded-full text-sm font-medium text-white/75 hover:text-white cursor-pointer fade-in-up`}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`frosted-card rounded-2xl p-4 text-center fade-in-up`}
                  style={{ animationDelay: `${0.2 + i * 0.07}s` }}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <p className="text-white font-semibold text-xs">{f.title}</p>
                  <p className="text-white/35 text-[10px] mt-1 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && weather && (
          <div className="space-y-5 fade-in-up">
            <WeatherCard
              data={weather}
              darkMode={darkMode}
              isFavorite={isFavorite}
              toggleSaved={toggleSaved}
            />
            <ForecastList list={forecast} darkMode={darkMode} />
          </div>
        )}
      </main>

      <footer className="relative text-center py-5 mt-4">
        <p className="text-white/20 text-[11px]">
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors underline underline-offset-2"
          >
            OpenWeatherMap API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
