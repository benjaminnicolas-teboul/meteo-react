import React, { useState } from "react";
import CitySearch from "@/components/CitySearch";
import { Card } from "@/components/ui/card"; // adapte ce chemin selon ta config Shadcn UI
import WeatherCard from "../WeatherCard";
import FetchCoords from "../FetchCoords";
import { Button } from "../ui/button";
import WeatherForecast from "../WeatherForecast";

const Meteo = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    console.log("Recherche de la ville :", city);
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const { latitude, longitude } = await FetchCoords(city);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=Europe/Paris`
      );
      const data = await res.json();
      setWeather({
        city,
        temperature: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
        daily: data.daily,
      });
    } catch (err) {
      setError(err.message || "Erreur API");
    }
    setLoading(false);
  };
  const handleReset = () => {
    setWeather(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {!weather && (
        <h1 className="text-3xl font-bold mb-6 text-center">
          🌦️ Check the weather in the location you want.
        </h1>
      )}

      {!weather && (
        <Card className="mb-6 p-6">
          <CitySearch onSearch={handleSearch} />
        </Card>
      )}

      {loading && (
        <p className="text-gray-600 animate-pulse text-center">Loading...</p>
      )}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {weather && (
        <>
          {weather.daily &&
          Array.isArray(weather.daily.time) &&
          weather.daily.time.length > 0 ? (
            // Affiche la prévision détaillée si daily est complète
            <WeatherForecast daily={weather.daily} />
          ) : (
            // Sinon, affiche la carte météo simple
            <WeatherCard
              weather={weather}
              location={weather.city}
              onReset={handleReset}
            />
          )}
          <div className="flex justify-center mt-6">
            <Button
              className="mt-4 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
              onClick={handleReset}
            >
              Change location
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Meteo;
