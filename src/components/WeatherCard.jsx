import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetWeatherIcon from "./GetWeatherIcon";

const WeatherCard = ({ weather, location, onReset }) => {
  if (!weather) return null;
  return (
    <Card>
      <CardHeader>
        <h3>The meteo in {location} :</h3>
      </CardHeader>
      <CardContent className="text-center">
        <GetWeatherIcon code={weather.code} />
        <p>Temp: {weather.temperature}°C</p>
        <p>Vent: {weather.wind} km/h</p>
        <Button className="mt-4" onClick={onReset}>
          Change location
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
