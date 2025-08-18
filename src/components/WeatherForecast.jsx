import WeatherCard from "./WeatherCard";

const WeatherForecast = ({ daily }) => {
  if (!daily) return null;

  return (
    <div className="md:pl-30  flex flex-col gap-4 mt-4 items-center overflow-x-visible pb-6 md:flex-row md:overflow-x-auto md:justify-center md:pb-10">
      {daily.time.map((date, idx) => (
        <WeatherCard
          className="shadow-lg animate-fade-in rounded-xl border border-gray-200 hover:shadow-xl hover:scale-[1.03] transition-transform duration-200 bg-white/90 w-64 h-80 p-4 flex flex-col items-center justify-between"
          key={date}
          date={date}
          max={daily.temperature_2m_max[idx]}
          min={daily.temperature_2m_min[idx]}
          code={daily.weathercode[idx]}
           wind={daily.windspeed_10m_max ? daily.windspeed_10m_max[idx] : undefined}
        />
      ))}
    </div>
  );
};
export default WeatherForecast;
