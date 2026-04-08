import { useState, useEffect, useCallback } from "react";
import { cleanForecastData } from "../utils/weatherUtils";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";


const COUNTRY_MAP = {
  india: "New Delhi",
  "united states": "Washington D.C.",
  usa: "Washington D.C.",
  uk: "London",
  "united kingdom": "London",
  france: "Paris",
  germany: "Berlin",
  japan: "Tokyo",
  china: "Beijing",
  pakistan: "Islamabad",
  australia: "Canberra",
  canada: "Ottawa",
};

const useWeatherAPI = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("");


  const getCityData = useCallback(async (cityName) => {
    let query = cityName.trim();
    if (!query) return;


    const lowerQuery = query.toLowerCase();
    if (COUNTRY_MAP[lowerQuery]) {
      query = COUNTRY_MAP[lowerQuery];
    }

    setLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
      );

      if (!geoRes.ok) throw new Error("Geocoding service unavailable.");
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        throw new Error(`Could not find "${query}". Please check the spelling.`);
      }

      const { lat, lon, name, state, country } = geoData[0];
      const formattedName = state ? `${name}, ${state}` : name;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error("Weather data service unavailable.");
      }

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();


      weatherData.name = formattedName;
      weatherData.sys.country = country;

      setWeather(weatherData);
      setCityName(name);

      const dailyForecasts = cleanForecastData(forecastData.list);
      setForecast(dailyForecasts);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getGeoWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const weatherRes = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!weatherRes.ok) {
        throw new Error("Failed to fetch weather for your location.");
      }

      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!forecastRes.ok) {
        throw new Error("Failed to fetch forecast for your location.");
      }

      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setCityName(weatherData.name);

      const dailyForecasts = cleanForecastData(forecastData.list);
      setForecast(dailyForecasts);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  const useMyGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getGeoWeather(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access denied. Please search by city name.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("Unable to retrieve your location.");
        }
      },
      { timeout: 10000 }
    );
  }, [getGeoWeather]);

  return {
    weather,
    forecast,
    loading,
    error,
    cityName,
    getCityData,
    useMyGPS,
  };
};

export default useWeatherAPI;
