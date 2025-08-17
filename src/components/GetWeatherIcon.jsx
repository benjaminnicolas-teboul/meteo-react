import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

const GetWeatherIcon = (code) => {
  // Exemples simplifiés pour Open-Meteo
  if (code === 0) return <WiDaySunny className="text-yellow-500 text-5xl" />;
  if ([1, 2, 3].includes(code)) return <WiCloud className="text-gray-400 text-5xl" />;
  if ([45, 48].includes(code)) return <WiRain className="text-blue-400 text-5xl" />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <WiSnow className="text-blue-200 text-5xl" />;
  return <WiCloud className="text-gray-400 text-5xl" />;
};
export default GetWeatherIcon;