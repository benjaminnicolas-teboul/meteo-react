import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning
} from "lucide-react";

const GetWeatherIcon = ({ code }) => {
  if (code === 0)
    return (
      <Sun
        className="h-12 w-12 text-yellow-400 drop-shadow-lg"
        aria-label="Clear sky"
        title="Clear sky"
      />
    );
  if (code === 1)
    return (
      <CloudSun
        className="h-12 w-12 text-gray-400 drop-shadow-lg"
        aria-label="Partly cloudy"
        title="Partly cloudy"
      />
    );
  if (code === 2)
    return (
      <CloudSun
        className="h-12 w-12 text-gray-300 drop-shadow-lg"
        aria-label="Mainly cloudy"
        title="Mainly cloudy"
      />
    );
  if (code === 3)
    return (
      <Cloud
        className="h-12 w-12 text-gray-500 drop-shadow-lg"
        aria-label="Cloudy"
        title="Cloudy"
      />
    );
  if ([45, 48].includes(code))
    return (
      <CloudFog
        className="h-12 w-12 text-gray-400 drop-shadow-lg"
        aria-label="Fog"
        title="Fog"
      />
    );
  if ([51, 53, 55].includes(code))
    return (
      <CloudRain
        className="h-12 w-12 text-blue-400 drop-shadow-lg"
        aria-label="Drizzle"
        title="Drizzle"
      />
    );
  if ([61, 63, 65, 80, 81, 82].includes(code))
    return (
      <CloudRain
        className="h-12 w-12 text-blue-600 drop-shadow-lg"
        aria-label="Rain"
        title="Rain"
      />
    );
  if ([71, 73, 75].includes(code))
    return (
      <CloudSnow
        className="h-12 w-12 text-cyan-200 drop-shadow-lg"
        aria-label="Snow"
        title="Snow"
      />
    );
  if ([95, 96, 99].includes(code))
    return (
      <CloudLightning
        className="h-12 w-12 text-yellow-600 drop-shadow-lg"
        aria-label="Thunderstorm"
        title="Thunderstorm"
      />
    );

  // Fallback
  return (
    <Cloud
      className="h-12 w-12 text-gray-400 drop-shadow-lg"
      aria-label="Unknown"
      title="Unknown"
    />
  );
};

export default GetWeatherIcon;