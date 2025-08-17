import React, { useEffect, useState } from 'react';
import fetchCityName from '../fetchCityName';
import fetchWeather from '../fetchWeather';




const Home = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
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
            setError(err || 'Impossible de charger la météo.');
          }
        },
        () => setError('Géolocalisation refusée ou indisponible.')
      );
    } else {
      setError('Géolocalisation non supportée par ce navigateur.');
    }
  }, []);

  return (
    <div className="max-w-md mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">
        {city ? `Météo locale à "${city}"` : 'Météo locale'}
      </h1>
      {error && <p className="text-red-600">{error}</p>}
      {weather ? (
        <div>
          <p className="text-xl">Température : {weather.temperature}°C</p>
          <p className="text-md mt-2">Vent : {weather.windspeed} km/h</p>
          <p className="text-md mt-2">
            Code météo : {weather.weathercode}
          </p>
        </div>
      ) : (
        !error && <p>Chargement des données météo...</p>
      )}
    </div>
  );
};

export default Home;