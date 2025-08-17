import React, { useState } from 'react';
import CitySearch from '@/components/CitySearch';
import { Card } from '@/components/ui/card'; // adapte ce chemin selon ta config Shadcn UI
import WeatherCard from '../WeatherCard';
import FetchCoords from '../FetchCoords';

const Meteo = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const { latitude, longitude } = await FetchCoords(city);
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
      <h1 className="text-3xl font-bold mb-6 text-center">🌦️ Check the weather in the location you want.</h1>
      <Card className="mb-6 p-6">
        <CitySearch onSearch={handleSearch} />
      </Card>
      {loading && <p className="text-center text-gray-600">Chargement...</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    {weather && (
      <WeatherCard
        city={weather.city}
        temperature={weather.temperature}
        wind={weather.wind}
        code={weather.code}
      />
    )}
    </div>
  );
};

export default Meteo;