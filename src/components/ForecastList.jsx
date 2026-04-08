import React, { useState, useMemo } from "react";
import ForecastCard from "./ForecastCard";
import { tempFilter, tempSort } from "../utils/weatherUtils";

const ForecastList = ({ list, darkMode }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");


  const processed = useMemo(() => {
    let r = tempFilter(list, activeFilter);
    if (sortOrder !== "none") r = tempSort(r, sortOrder);
    return r;
  }, [list, activeFilter, sortOrder]);


  const summary = useMemo(() => list.reduce(
    (acc, d) => ({
      min: Math.min(acc.min, d.avgTemp),
      max: Math.max(acc.max, d.avgTemp),
      sum: acc.sum + d.avgTemp,
    }),
    { min: Infinity, max: -Infinity, sum: 0 }
  ), [list]);

  if (!list.length) return null;

  const filters = [
    { v: "all", label: "All", icon: "🌍" },
    { v: "hot", label: "Hot >30°", icon: "🔥" },
    { v: "moderate", label: "15–30°", icon: "😊" },
    { v: "cold", label: "Cold <15°", icon: "❄️" },
  ];

  const sorts = [
    { v: "none", label: "Default", icon: "📅" },
    { v: "asc", label: "Low→High", icon: "📈" },
    { v: "desc", label: "High→Low", icon: "📉" },
  ];

  return (
    <div className="fade-in-up delay-2">

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-white font-bold text-base tracking-tight">5-Day Forecast</h3>
          <p className="text-white/35 text-xs mt-0.5">
            Range&nbsp;
            <span className="text-blue-300 font-medium">{summary.min}°</span>
            <span className="text-white/20 mx-1">–</span>
            <span className="text-orange-300 font-medium">{summary.max}°</span>
            &nbsp;· Avg <span className="text-white/60 font-medium">{Math.round(summary.sum / list.length)}°C</span>
          </p>
        </div>


        <div className="flex flex-wrap items-center gap-2">

          <div className="flex gap-1.5">
            {filters.map((f) => (
              <button
                key={f.v}
                id={`filter-${f.v}`}
                onClick={() => setActiveFilter(f.v)}
                className={`btn-pill flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer ${activeFilter === f.v
                    ? "bg-white text-gray-900 border-transparent shadow-md"
                    : "bg-white/8 text-white/60 border-white/12 hover:bg-white/15"
                  }`}
              >
                <span>{f.icon}</span>
                <span className="hidden sm:inline">{f.label}</span>
              </button>
            ))}
          </div>


          <div className="w-px h-5 bg-white/15" />


          <div className="flex gap-1.5">
            {sorts.map((s) => (
              <button
                key={s.v}
                id={`sort-${s.v}`}
                onClick={() => setSortOrder(s.v)}
                className={`btn-pill flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer ${sortOrder === s.v
                    ? "bg-white text-gray-900 border-transparent shadow-md"
                    : "bg-white/8 text-white/60 border-white/12 hover:bg-white/15"
                  }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {processed.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {processed.map((day, i) => (
            <ForecastCard key={day.dt} info={day} darkMode={darkMode} index={i} />
          ))}
        </div>
      ) : (
        <div className="frosted-card rounded-2xl py-12 text-center">
          <p className="text-white/40 text-sm">No days match this filter</p>
          <button
            onClick={() => setActiveFilter("all")}
            className="mt-2 text-white/60 text-xs underline cursor-pointer hover:text-white"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ForecastList;
