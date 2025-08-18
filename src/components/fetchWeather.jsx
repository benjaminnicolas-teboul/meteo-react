const fetchWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Paris`
  );
  const data = await res.json();
  return {
    temperature: data.current_weather.temperature,
    wind: data.current_weather.windspeed,
     code: data.daily.weathercode[0],
    daily: data.daily, 
  };
};
export default fetchWeather;