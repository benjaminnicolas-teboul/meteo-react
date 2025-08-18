import React, { useEffect, useState } from "react";
import fetchCityName from "../fetchCityName";
import fetchWeather from "../fetchWeather";
import WeatherCard from "../WeatherCard";
import WeatherForecast from "../WeatherForecast";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const w = await fetchWeather(lat, lon);
            setWeather(w);
            const c = await fetchCityName(lat, lon);
            setCity(c);
          } catch (err) {
            setError(err || "Impossible to load the forecast.");
          }
        },
        () => setError("Geolocalisation denied or unavailable.")
      );
    } else {
      setError("Geolocalisation not supported bye this browser.");
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 break-words whitespace-normal px-4">
        Local forecast in {city || "inconnue"}
      </h1>
      {error && <p className="text-red-600">{error}</p>}
      {weather ? (
        <>
          {weather.daily &&
          Array.isArray(weather.daily.time) &&
          weather.daily.time.length > 0 ? (
            <WeatherForecast daily={weather.daily} />
          ) : (
            // Affiche WeatherCard uniquement s'il n'y a pas de données daily valides
            weather.temperature !== undefined &&
            weather.wind !== undefined &&
            weather.code !== undefined && (
              <WeatherCard weather={weather} location={city} />
            )
          )}
        </>
      ) : (
        !error && <p className="animate-pulse text-center text-primary">Loading forecast datas...</p>
      )}
    </div>
  );
};

export default Home;
