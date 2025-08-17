import React, { useState } from 'react';
import CitySearch from '@/components/CitySearch';
import { Card } from '@/components/ui/card'; // adapte ce chemin selon ta config Shadcn UI
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

const getWeatherIcon = (code) => {
  // Exemples simplifiés pour Open-Meteo
  if (code === 0) return <WiDaySunny className="text-yellow-500 text-5xl" />;
  if ([1, 2, 3].includes(code)) return <WiCloud className="text-gray-400 text-5xl" />;
  if ([45, 48].includes(code)) return <WiRain className="text-blue-400 text-5xl" />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <WiSnow className="text-blue-200 text-5xl" />;
  return <WiCloud className="text-gray-400 text-5xl" />;
};

const fetchCoords = async (city) => {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
  }
  throw new Error("Ville non trouvée !");
};

const Meteo = () => {
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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await res.json();
      setWeather({
        city,
        temperature: data.current_weather.temperature,
        wind: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
      });
    } catch (err) {
      setError(err.message || 'Erreur API');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🌦️ Recherche météo</h1>
      <Card className="mb-6 p-6">
        <CitySearch onSearch={handleSearch} />
      </Card>
      {loading && <p className="text-center text-gray-600">Chargement...</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {weather && (
        <Card className="p-6 text-center bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl rounded-xl mt-6">
          {getWeatherIcon(weather.code)}
          <h2 className="text-xl font-bold mt-2">{weather.city}</h2>
          <p className="text-2xl font-semibold">{weather.temperature}°C</p>
          <p className="text-md mt-2">💨 Vent : {weather.wind} km/h</p>
        </Card>
      )}
    </div>
  );
};

export default Meteo;