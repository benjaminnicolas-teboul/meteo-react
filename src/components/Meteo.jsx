import React, { useState } from 'react';
import CitySearch from './CitySearch';

// Fonction utilitaire pour obtenir latitude/longitude à partir du nom de la ville
async function fetchCoords(city) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
  } else {
    throw new Error("Ville non trouvée !");
  }
}

export default function Meteo() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const { latitude, longitude } = await fetchCoords(city);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&lang=fr`
      );
      const data = await res.json();
      setWeather({
        city,
        temperature: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        description: data.current_weather.weathercode,
      });
    } catch (err) {
      setError(err.message || 'Erreur API');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recherche météo</h1>
      <CitySearch onSearch={handleSearch} />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {weather && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{weather.city}</h2>
          <p>Température : {weather.temperature}°C</p>
          <p>Vent : {weather.wind} km/h</p>
          <p>Code météo : {weather.description}</p>
        </div>
      )}
    </div>
  );
}