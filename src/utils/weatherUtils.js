export const outfitLogic = (temp, rainProb, windSpeed, condition) => {
  const rules = [
    {
      condition: rainProb > 20,
      suggestion: "☔ Carry an umbrella",
      priority: "high",
    },
    {
      condition: temp < 5,
      suggestion: "🧥 Wear a heavy winter coat",
      priority: "high",
    },
    {
      condition: temp >= 5 && temp < 15,
      suggestion: "🧤 Wear warm clothes & a jacket",
      priority: "medium",
    },
    {
      condition: temp >= 15 && temp < 22,
      suggestion: "👕 A light jacket would be comfortable",
      priority: "low",
    },
    {
      condition: temp >= 22 && temp < 30,
      suggestion: "😎 Comfortable weather — casual clothes are fine",
      priority: "low",
    },
    {
      condition: temp >= 30,
      suggestion: "🩳 Light clothes recommended — stay hydrated!",
      priority: "high",
    },
    {
      condition: windSpeed > 30,
      suggestion: "💨 Strong winds — secure loose items",
      priority: "medium",
    },
    {
      condition: condition?.toLowerCase().includes("snow"),
      suggestion: "❄️ Wear snow boots and heavy layers",
      priority: "high",
    },
    {
      condition: condition?.toLowerCase().includes("fog"),
      suggestion: "🌫️ Drive carefully — foggy conditions",
      priority: "medium",
    },
  ];
  return rules
    .filter((rule) => rule.condition)
    .map((rule) => ({ text: rule.suggestion, priority: rule.priority }));
};

export const pickBgTheme = (temp, condition) => {
  if (!temp && !condition) return "bg-cloudy";

  const cond = condition?.toLowerCase() || "";
  if (cond.includes("cloud") || cond.includes("fog") || cond.includes("mist")) {
    return "bg-cloudy";
  }
  if (temp < 15) return "bg-cold";
  if (temp > 30) return "bg-hot";
  return "bg-moderate";
};

export const setEmoji = (condition, iconCode) => {
  const cond = condition?.toLowerCase() || "";

  if (cond.includes("thunder")) return "⛈️";
  if (cond.includes("drizzle")) return "🌦️";
  if (cond.includes("rain")) return "🌧️";
  if (cond.includes("snow")) return "❄️";
  if (cond.includes("sleet")) return "🌨️";
  if (cond.includes("fog") || cond.includes("mist") || cond.includes("haze")) return "🌫️";
  if (cond.includes("smoke") || cond.includes("dust")) return "💨";
  if (cond.includes("tornado")) return "🌪️";
  if (cond.includes("clear")) {
    return iconCode?.includes("n") ? "🌙" : "☀️";
  }
  if (cond.includes("cloud")) {
    if (cond.includes("few") || cond.includes("scatter")) return "⛅";
    return "☁️";
  }
  return "🌤️";
};

export const getIconUrl = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export const formatShortDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const kelvinToCelsius = (k) => Math.round(k - 273.15);

export const groupForecastByDay = (forecastList) => {
  return forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};

export const cleanForecastData = (forecastList) => {
  const grouped = groupForecastByDay(forecastList);

  return Object.keys(grouped)
    .slice(0, 5)
    .map((date) => {
      const dayItems = grouped[date];
      const midday =
        dayItems.find((item) => {
          const hour = new Date(item.dt * 1000).getHours();
          return hour >= 11 && hour <= 14;
        }) || dayItems[0];

      const temps = dayItems.map((item) => item.main.temp);
      const minTemp = temps.reduce((min, t) => Math.min(min, t), temps[0]);
      const maxTemp = temps.reduce((max, t) => Math.max(max, t), temps[0]);
      const maxRainProb = dayItems.reduce(
        (max, item) => Math.max(max, (item.pop || 0) * 100),
        0
      );

      return {
        ...midday,
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        avgTemp: Math.round(midday.main.temp),
        rainProb: Math.round(maxRainProb),
      };
    });
};

export const tempFilter = (forecasts, filter) => {
  return forecasts.filter((day) => {
    if (filter === "hot") return day.avgTemp > 30;
    if (filter === "cold") return day.avgTemp < 15;
    if (filter === "moderate") return day.avgTemp >= 15 && day.avgTemp <= 30;
    return true;
  });
};

export const tempSort = (forecasts, order) => {
  return [...forecasts].sort((a, b) => {
    if (order === "asc") return a.avgTemp - b.avgTemp;
    if (order === "desc") return b.avgTemp - a.avgTemp;
    return 0;
  });
};

export const getHumidityDesc = (humidity) => {
  if (humidity < 30) return "Dry";
  if (humidity < 60) return "Comfortable";
  if (humidity < 80) return "Humid";
  return "Very Humid";
};

export const getWindDesc = (speed) => {
  if (speed < 5) return "Calm";
  if (speed < 15) return "Light Breeze";
  if (speed < 25) return "Moderate Wind";
  if (speed < 40) return "Strong Wind";
  return "Storm";
};
