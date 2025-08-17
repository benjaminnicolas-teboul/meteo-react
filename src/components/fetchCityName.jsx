const fetchCityName = async () => {
  const res = await fetch('https://ipapi.co/json/');
  const data = await res.json();
  return data.city || 'inconnue';
};
export default fetchCityName;