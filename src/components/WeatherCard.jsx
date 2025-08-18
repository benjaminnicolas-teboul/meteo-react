import { Card, CardHeader, CardContent } from "@/components/ui/card";
import GetWeatherIcon from "./GetWeatherIcon";

const WeatherCard = ({
  weather,
  location,
  date,
  max,
  min,
  code,
  className = ""
}) => {
  // Fonction pour formater la date en anglais (jour de la semaine + jour + mois)
  const formatDate = (dateStr) => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  // Affichage pour la météo actuelle (avec weather object)
  if (weather && location) {
    return (
      <Card className={className}>
        <CardHeader className="flex justify-center">
          <h3 className="text-center">Weather in {location}:</h3>
        </CardHeader>
        <CardContent className="text-center">
          <GetWeatherIcon className="w-16 h-16 mx-auto" code={weather.code} />
          <p>Temp: {weather.temperature}°C</p>
          <p>Wind: {weather.wind} km/h</p>
        </CardContent>
      </Card>
    );
  }

  // Affichage pour la météo d’un jour dans le forecast
  if (date && code !== undefined && max !== undefined && min !== undefined) {
    return (
      <Card className={`p-4 text-center ${className}`}>
        <CardHeader className="flex justify-center">
          <h3>{formatDate(date)}</h3>
        </CardHeader>
        <CardContent>
          <GetWeatherIcon className="w-16 h-16 mx-auto" code={code} />
          <p>Max: {max}°C</p>
          <p>Min: {min}°C</p>
        </CardContent>
      </Card>
    );
  }

  // Sinon, on ne rend rien
  return null;
};

export default WeatherCard;