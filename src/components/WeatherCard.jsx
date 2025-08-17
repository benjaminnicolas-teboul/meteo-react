import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetWeatherIcon from "./GetWeatherIcon";

const WeatherCard = ({ weather, location }) => {
  return (
    <Card>
      <CardHeader>
        <h3>{location}</h3>
      </CardHeader>
      <CardContent className="text-center">
        <GetWeatherIcon code={weather.code} />
        <p>🌦️ {weather.description}</p>
        <p>Temp: {weather.temp}°C</p>
        <Button className="mt-4">Changer de lieu</Button>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;